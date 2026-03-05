import { useState, useRef, useEffect, useCallback } from 'react';

interface IconItem {
  name: string;
  abbr?: string;
  flag?: string;
  color?: string;
  code?: string;
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

  // Position tooltip relative to button, clamped to viewport
  useEffect(() => {
    if (!open || !btnRef.current || !containerRef.current) return;

    const position = () => {
      const btn = btnRef.current;
      const container = containerRef.current;
      if (!btn || !container) return;

      const btnRect = btn.getBoundingClientRect();
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
      const viewportW = window.innerWidth;
      const gap = 10;

      // Center horizontally on button, clamp to viewport
      let left = btnRect.left + btnRect.width / 2 - containerWidth / 2;
      left = Math.max(12, Math.min(left, viewportW - containerWidth - 12));

      // Position above button
      let top = btnRect.top - containerHeight - gap;
      if (top < 12) {
        // If no room above, position below
        top = btnRect.bottom + gap;
      }

      container.style.left = `${left}px`;
      container.style.top = `${top}px`;

      // Adjust arrow position
      const arrow = container.querySelector('.tooltip__arrow') as HTMLElement;
      if (arrow) {
        const arrowLeft = btnRect.left + btnRect.width / 2 - left - 7;
        arrow.style.left = `${arrowLeft}px`;
      }
    };

    position();
    window.addEventListener('resize', position);
    window.addEventListener('scroll', position, true);
    return () => {
      window.removeEventListener('resize', position);
      window.removeEventListener('scroll', position, true);
    };
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
        {visible.map((item, i) => (
          <div key={i} className="ch__item" title={item.name}>
            <span className="ch__abbr">{type === 'language' ? item.code : item.abbr}</span>
          </div>
        ))}

        {remaining > 0 && (
          <>
            <button
              ref={btnRef}
              className={`tooltip__btn ${open ? 'tooltip__btn--active' : ''}`}
              aria-label={`Показать все: ${title} (${totalCount})`}
              onClick={toggle}
            >
              +{remaining}
            </button>

            {open && (
              <div
                ref={containerRef}
                className="tooltip__container tooltip__container--visible"
              >
                <div className="tooltip__arrow" />
                {items.map((item, i) => (
                  <div key={i} className="ch__item" title={item.name}>
                    <span className="ch__abbr">{type === 'language' ? item.code : item.abbr}</span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default IconRowWithPopover;
