import { useState, useEffect, useRef, useCallback } from 'react';
import { CASINO_DATA, ISO_TO_RU } from '@/data/casino-data';
import { ChevronLeft, ExternalLink, Copy, Check, Clock, Flame, Trophy, Shield, Zap, Gift } from 'lucide-react';
import { toast } from 'sonner';
import CircularProgress from './CircularProgress';
import IconRowWithPopover from './IconRowWithPopover';
import TabContent from './TabContent';
import MobileStickyBar from './MobileStickyBar';

const BADGE_ICONS: Record<string, React.ReactNode> = {
  trophy: <Trophy size={14} />,
  shield: <Shield size={14} />,
  bolt: <Zap size={14} />,
  gift: <Gift size={14} />,
};

function getFlag(code: string) {
  return code
    .toUpperCase()
    .split('')
    .map((c) => String.fromCodePoint(0x1f1e6 + c.charCodeAt(0) - 65))
    .join('');
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');
}

type GeoStatus = 'available' | 'banned' | 'unknown';

interface GeoState {
  flag: string;
  countryISO: string;
  countryNameRu: string;
  status: GeoStatus;
}

function resolveGeoStatus(countryISO: string | undefined, bannedISO: string[]): GeoStatus {
  if (!countryISO) return 'unknown';
  const normalized = countryISO.trim().toUpperCase();
  if (!normalized) return 'unknown';
  const bannedNormalized = bannedISO.map((c) => c.trim().toUpperCase());
  return bannedNormalized.includes(normalized) ? 'banned' : 'available';
}

const CasinoCard = () => {
  const cardRef = useRef<HTMLDivElement>(null!);
  const [activeTab, setActiveTab] = useState('overview');
  const [promoCopied, setPromoCopied] = useState(false);
  // Timer phases: 56min → 30min → 10min → restart
  const TIMER_PHASES = [56 * 60, 30 * 60, 10 * 60];
  const [timerPhase, setTimerPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(CASINO_DATA.timerMinutes ? TIMER_PHASES[0] : 0);
  const [timerUrgent, setTimerUrgent] = useState(false);

  // Dynamic user count
  const [usedCount, setUsedCount] = useState(() => {
    // Seed based on current hour so it feels consistent per session but varies across time
    const hourSeed = new Date().getHours();
    return CASINO_DATA.usedCount + hourSeed * 3;
  });

  const [geo, setGeo] = useState<GeoState | null>(null);

  // Timer with phases
  useEffect(() => {
    if (!CASINO_DATA.timerMinutes) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Move to next phase or restart
          setTimerPhase((p) => {
            const next = (p + 1) % TIMER_PHASES.length;
            setTimeLeft(TIMER_PHASES[next]);
            return next;
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Urgency detection
  useEffect(() => {
    setTimerUrgent(timeLeft > 0 && timeLeft <= 5 * 60);
  }, [timeLeft]);

  // Simulated user count growth: +1 every 15-45s
  useEffect(() => {
    const tick = () => {
      setUsedCount((prev) => prev + 1);
    };
    const scheduleNext = () => {
      const delay = 15000 + Math.random() * 30000; // 15-45 seconds
      return setTimeout(() => {
        tick();
        timerRef.current = scheduleNext();
      }, delay);
    };
    const timerRef = { current: scheduleNext() };
    return () => clearTimeout(timerRef.current);
  }, []);

  // Geo detection
  useEffect(() => {
    const controller = new AbortController();
    fetch('https://ipapi.co/json/', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Geo API error');
        return res.json();
      })
      .then((data) => {
        const code: string | undefined = data?.country_code;
        if (!code) {
          setGeo({ flag: '🌍', countryISO: '', countryNameRu: '', status: 'unknown' });
          return;
        }
        const iso = code.trim().toUpperCase();
        const flag = getFlag(iso);
        const nameRu = ISO_TO_RU[iso] || data?.country_name || iso;
        const status = resolveGeoStatus(iso, CASINO_DATA.bannedCountriesISO);
        setGeo({ flag, countryISO: iso, countryNameRu: nameRu, status });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setGeo({ flag: '🌍', countryISO: '', countryNameRu: '', status: 'unknown' });
        }
      });
    return () => controller.abort();
  }, []);

  const copyPromoCode = useCallback(() => {
    navigator.clipboard.writeText(CASINO_DATA.promoCode).catch(() => {});
    setPromoCopied(true);
    toast.success('Промокод скопирован!');
    setTimeout(() => setPromoCopied(false), 2000);
  }, []);

  const renderStars = () => {
    const full = Math.floor(CASINO_DATA.overallRating);
    const hasHalf = CASINO_DATA.overallRating % 1 >= 0.3;
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < full) stars.push(<span key={i} className="text-primary">★</span>);
      else if (i === full && hasHalf) stars.push(<span key={i} className="text-primary/70">★</span>);
      else stars.push(<span key={i} style={{ color: 'rgba(255,255,255,0.15)' }}>★</span>);
    }
    return stars;
  };

  const tabs = [
    { id: 'overview', label: 'Обзор' },
    { id: 'bonuses', label: 'Бонусы' },
    { id: 'reviews', label: 'Отзывы' },
    { id: 'payments', label: 'Платежи' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <div className="max-w-[960px] mx-auto px-3 py-4 pb-[120px] lg:pb-6">
      {/* Glass Card */}
      <div className="glass-card" ref={cardRef}>
        {/* Rating Badge Link */}
        <a href={CASINO_DATA.catalogUrl} className="rating-badge-link">
          <ChevronLeft size={16} />
          <span>🏆 #{CASINO_DATA.ratingPosition} в рейтинге</span>
        </a>

        {/* Two-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 p-4 pt-3">
          {/* Column 1: Conversion Zone */}
          <div className="flex flex-col gap-4 lg:w-[35%] lg:flex-shrink-0">
            {/* Logo Section */}
            <div className="flex flex-col items-center gap-2">
              <div className="relative inline-block">
                <img
                  src={CASINO_DATA.logo}
                  alt={CASINO_DATA.name}
                  title={CASINO_DATA.name}
                  width={CASINO_DATA.logoWidth}
                  height={CASINO_DATA.logoHeight}
                  className="object-contain max-w-full h-auto"
                />
                {/* Geo indicator on logo */}
                {geo && geo.status !== 'unknown' && (
                  <div
                    className={`geo-indicator ${
                      geo.status === 'available' ? 'geo-indicator--available' : 'geo-indicator--unavailable'
                    }`}
                    title={geo.status === 'available' ? `Доступно из ${geo.countryNameRu}` : `Недоступно из ${geo.countryNameRu}`}
                  >
                    <span>{geo.flag}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full block"
                      style={
                        geo.status === 'available'
                          ? { background: '#34D399', boxShadow: '0 0 6px rgba(16,185,129,0.7)' }
                          : { background: '#EF4444', boxShadow: '0 0 6px rgba(239,68,68,0.7)' }
                      }
                    />
                  </div>
                )}
              </div>
              <span className="text-sm font-medium text-center w-full" style={{ color: 'rgba(255,255,255,0.4)' }}>
                Онлайн казино {CASINO_DATA.name}
              </span>
            </div>

            {/* Official Site Button */}
            <a
              href={CASINO_DATA.officialSiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="casino-cta-btn"
            >
              Официальный сайт
              <ExternalLink size={16} />
            </a>

            {/* Promo Widget */}
            <div className="promo-widget">
              <div className="text-[11px] uppercase tracking-[0.15em] font-semibold mb-2" style={{ color: 'rgba(245, 158, 11, 0.7)' }}>
                {CASINO_DATA.promoLabel}
              </div>
              <div className="text-[26px] leading-tight font-extrabold mb-1 tracking-tight">
                {CASINO_DATA.bonusOffer}
              </div>
              <div className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {CASINO_DATA.bonusDesc}
              </div>

              <button
                onClick={copyPromoCode}
                className={`promo-code-box ${promoCopied ? 'copied' : ''}`}
              >
                {!promoCopied && (
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)',
                      animation: 'shimmer 3s infinite',
                    }}
                  />
                )}
                <span className="relative z-10 tracking-[0.2em]">
                  {promoCopied ? 'СКОПИРОВАНО' : CASINO_DATA.promoCode}
                </span>
                <span className="relative z-10">
                  {promoCopied ? <Check size={20} strokeWidth={3} /> : <Copy size={20} strokeWidth={2.5} />}
                </span>
              </button>

              {/* Social Proof */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-t-[rgba(255,255,255,0.05)]">
                {/* Timer */}
                {CASINO_DATA.timerMinutes > 0 && timeLeft > 0 && (
                  <div className="flex items-center gap-2 text-primary">
                    <Clock size={14} />
                    <div>
                      <div className="text-[9px] uppercase font-bold leading-none mb-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Истекает через
                      </div>
                      <div className="font-mono-casino text-sm font-bold tabular-nums">
                        {formatTime(timeLeft)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Counter */}
                <div className="flex items-center gap-2" style={{ color: '#F97316' }}>
                  <div className="p-1.5 rounded-lg flex animate-pulse" style={{ background: 'rgba(249,115,22,0.1)' }}>
                    <Flame size={16} />
                  </div>
                  <div>
                    <div className="text-sm font-black text-foreground leading-none tracking-tight">
                      {CASINO_DATA.usedCount}
                    </div>
                    <div className="text-[9px] uppercase font-bold mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      человек уже использовали
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Information Zone */}
          <div className="flex flex-col gap-5 flex-1">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2">
              {CASINO_DATA.badges.map((badge, i) => (
                <span key={i} className="trust-badge">
                  {BADGE_ICONS[badge.icon]}
                  {badge.text}
                </span>
              ))}
            </div>

            {/* Rating Section */}
            <div className="flex flex-col sm:flex-row gap-5 items-start">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="text-[52px] leading-none font-black tracking-tighter">
                  {CASINO_DATA.overallRating}
                </div>
                <div>
                  <div className="flex gap-0.5 text-lg">{renderStars()}</div>
                  <div className="text-[11px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                    Оценка редакции
                  </div>
                </div>
              </div>
              <div className="flex gap-2.5 overflow-x-auto scrollbar-none flex-1 pb-1">
                {CASINO_DATA.subRatings.map((sr, i) => (
                  <CircularProgress key={i} value={sr.value} label={sr.label} />
                ))}
              </div>
            </div>

            {/* Providers / Payments / Languages */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6" style={{ minWidth: 0 }}>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Провайдеры
                </div>
                <IconRowWithPopover
                  items={CASINO_DATA.providers}
                  visibleCount={CASINO_DATA.visibleProviders}
                  totalCount={CASINO_DATA.totalProviders}
                  title="Провайдеры"
                  type="icon"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Платежи
                </div>
                <IconRowWithPopover
                  items={CASINO_DATA.payments}
                  visibleCount={CASINO_DATA.visiblePayments}
                  totalCount={CASINO_DATA.totalPayments}
                  title="Платежи"
                  type="icon"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Языки
                </div>
                <IconRowWithPopover
                  items={CASINO_DATA.languages}
                  visibleCount={CASINO_DATA.visibleLanguages}
                  totalCount={CASINO_DATA.totalLanguages}
                  title="Языки"
                  type="language"
                />
              </div>
            </div>

            {/* Geo Availability */}
            {geo && (
              <div
                className={`geo-block ${
                  geo.status === 'available'
                    ? 'geo-block--available'
                    : geo.status === 'banned'
                    ? 'geo-block--unavailable'
                    : 'geo-block--unknown'
                }`}
              >
                <span className="text-lg">{geo.flag}</span>
                <span>
                  {geo.status === 'available' && `✅ Доступно из ${geo.countryNameRu}`}
                  {geo.status === 'banned' && `❌ Недоступно из ${geo.countryNameRu}`}
                  {geo.status === 'unknown' && '⚪ Не удалось определить страну'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          className="sticky top-0 z-30 flex gap-0.5 px-4 overflow-x-auto scrollbar-none border-t border-t-[rgba(255,255,255,0.05)]"
          style={{ background: 'rgba(30, 33, 40, 0.97)', backdropFilter: 'blur(20px)' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <TabContent activeTab={activeTab} />

      {/* Mobile Sticky Bar */}
      <MobileStickyBar cardRef={cardRef} />
    </div>
  );
};

export default CasinoCard;
