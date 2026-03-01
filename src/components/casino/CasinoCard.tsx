import { useState, useEffect, useRef, useCallback } from 'react';
import { CASINO_DATA } from '@/data/casino-data';
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

const CasinoCard = () => {
  const cardRef = useRef<HTMLDivElement>(null!);
  const [activeTab, setActiveTab] = useState('overview');
  const [promoCopied, setPromoCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(
    CASINO_DATA.timerMinutes ? CASINO_DATA.timerMinutes * 60 + 20 : 0
  );
  const [geo, setGeo] = useState<{
    flag: string;
    name: string;
    available: boolean | null;
  } | null>(null);

  // Timer
  useEffect(() => {
    if (!CASINO_DATA.timerMinutes) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Geo detection
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((res) => res.json())
      .then((data) => {
        const code = data.country_code;
        const name = data.country_name;
        const flag = getFlag(code);
        let available: boolean | null = null;
        if (CASINO_DATA.allowedCountries?.length > 0) {
          available = CASINO_DATA.allowedCountries.includes(code);
        }
        setGeo({ flag, name, available });
      })
      .catch(() => {});
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
                {geo && geo.available !== null && (
                  <div
                    className={`geo-indicator ${
                      geo.available ? 'geo-indicator--available' : 'geo-indicator--unavailable'
                    }`}
                    title={geo.available ? `Доступно из ${geo.name}` : `Недоступно из ${geo.name}`}
                  >
                    <span>{geo.flag}</span>
                    <span
                      className="w-2.5 h-2.5 rounded-full block"
                      style={
                        geo.available
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  geo.available === true
                    ? 'geo-block--available'
                    : geo.available === false
                    ? 'geo-block--unavailable'
                    : 'geo-block--unknown'
                }`}
              >
                <span className="text-lg">{geo.flag}</span>
                <span>
                  {geo.available === true && `✅ Доступно из ${geo.name}`}
                  {geo.available === false && `❌ Недоступно из ${geo.name}`}
                  {geo.available === null && geo.name}
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
