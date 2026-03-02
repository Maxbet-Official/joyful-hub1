import { useState, useRef, useEffect, useCallback } from 'react';

interface IconItem {
  name: string;
  abbr?: string;
  flag?: string;
  color?: string;
}

interface IconRowWithPopoverProps {
  items: IconItem[];
  visibleCount: number;
  totalCount: number;
  title: string;
  type: 'icon' | 'language';
}

// Global close function for "only one tooltip open at a time"
let closeAllTooltipsFns: (() => void)[] = [];

const IconRowWithPopover = ({ items, visibleCount, totalCount, title, type }: IconRowWithPopoverProps) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const visible = items.slice(0, visibleCount);
  const remaining = totalCount - visibleCount;

  const close = useCallback(() => setOpen(false), []);

  // Register/unregister close fn
  useEffect(() => {
    closeAllTooltipsFns.push(close);
    return () => {
      closeAllTooltipsFns = closeAllTooltipsFns.filter(fn => fn !== close);
    };
  }, [close]);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !containerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  const toggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Close all other tooltips first
    closeAllTooltipsFns.forEach(fn => {
      if (fn !== close) fn();
    });
    setOpen(v => !v);
  };

  return (
    <div className="oc__characteristics">
      <div className="ch__list">
        {visible.map((item, i) =>
          type === 'language' ? (
            <div key={i} className="ch__item ch__item--lang" title={item.name}>
              <span className="text-sm leading-none">{item.flag}</span>
              <span className="ch__lang-name">{item.name}</span>
            </div>
          ) : (
            <div key={i} className="ch__item" title={item.name}>
              <span className="ch__abbr">{item.abbr}</span>
            </div>
          )
        )}

        {remaining > 0 && (
          <div className="tooltip">
            <button
              ref={btnRef}
              className={`tooltip__btn ${open ? 'tooltip__btn--active' : ''}`}
              aria-label={`Показать все: ${title} (${totalCount})`}
              onClick={toggle}
            >
              +{remaining}
            </button>

            <div
              ref={containerRef}
              className={`tooltip__container ${type !== 'language' ? 'tooltip__container--providers' : ''} ${open ? 'tooltip__container--visible' : ''}`}
            >
              {/* Arrow */}
              <div className="tooltip__arrow" />

              {items.map((item, i) =>
                type === 'language' ? (
                  <div key={i} className="tooltip__lang-item">
                    <span className="text-base leading-none">{item.flag}</span>
                    <span className="tooltip__lang-name">{item.name}</span>
                  </div>
                ) : (
                  <div key={i} className="ch__item" title={item.name}>
                    <span className="ch__abbr">{item.abbr}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IconRowWithPopover;
