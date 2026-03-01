import { useState, useEffect, useRef } from 'react';
import { CASINO_DATA } from '@/data/casino-data';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface MobileStickyBarProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const MobileStickyBar = ({ cardRef }: MobileStickyBarProps) => {
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [cardRef]);

  const copyCode = () => {
    navigator.clipboard.writeText(CASINO_DATA.promoCode).catch(() => {});
    setCopied(true);
    toast.success('Промокод скопирован!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`sticky-bar lg:hidden ${visible ? 'visible' : ''}`}>
      <div className="flex-shrink-0 text-sm font-bold max-w-[80px] truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>
        {CASINO_DATA.name}
      </div>
      <button
        onClick={copyCode}
        className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-bold tracking-wider font-mono-casino transition-all active:scale-95 ${
          copied
            ? 'bg-accent text-accent-foreground border-accent'
            : ''
        }`}
        style={
          copied
            ? {}
            : {
                background: 'rgba(245, 158, 11, 0.15)',
                color: '#FBBF24',
                border: '1px solid rgba(245, 158, 11, 0.25)',
              }
        }
      >
        {copied ? '✓ OK' : CASINO_DATA.promoCode}
      </button>
      <a
        href={CASINO_DATA.officialSiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl font-bold text-sm text-foreground"
        style={{ background: 'linear-gradient(135deg, #00C853 0%, #00A844 100%)' }}
      >
        ИГРАТЬ
        <ArrowRight size={16} />
      </a>
    </div>
  );
};

export default MobileStickyBar;
