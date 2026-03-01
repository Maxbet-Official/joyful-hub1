import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

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

const IconRowWithPopover = ({ items, visibleCount, totalCount, title, type }: IconRowWithPopoverProps) => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout>>();
  const visible = items.slice(0, visibleCount);
  const remaining = totalCount - visibleCount;

  const show = useCallback(() => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpen(true), 100);
  }, []);

  const hide = useCallback(() => {
    clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => setOpen(false), 220);
  }, []);

  const keepOpen = useCallback(() => {
    clearTimeout(hoverTimeout.current);
  }, []);

  useEffect(() => {
    const handleClick = (e: PointerEvent) => {
      if (!popoverRef.current?.contains(e.target as Node) && !btnRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('pointerdown', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const [popoverStyle, setPopoverStyle] = useState<React.CSSProperties>({});
  const [arrowLeft, setArrowLeft] = useState(0);

  useEffect(() => {
    if (!open || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const popWidth = type === 'language' ? 260 : 300;
    const cx = rect.left + rect.width / 2;
    let left = cx - popWidth / 2;
    if (left < 8) left = 8;
    if (left + popWidth > window.innerWidth - 8) left = window.innerWidth - popWidth - 8;
    setPopoverStyle({
      position: 'fixed',
      zIndex: 9999,
      top: rect.top - 10,
      left,
      width: popWidth,
      transform: 'translateY(-100%)',
    });
    setArrowLeft(Math.max(16, Math.min(cx - left, popWidth - 16)));
  }, [open, type]);

  return (
    <div className="flex items-center gap-2 flex-wrap max-md:flex-nowrap max-md:overflow-x-auto scrollbar-none">
      {visible.map((item, i) =>
        type === 'language' ? (
          <span key={i} className="lang-badge" title={item.name}>
            <span className="text-sm leading-none">{item.flag}</span>
            <span>{item.name}</span>
          </span>
        ) : (
          <div key={i} className="logo-icon" title={item.name}>
            {item.abbr}
          </div>
        )
      )}

      {remaining > 0 && (
        <div
          className="relative"
          onMouseEnter={show}
          onMouseLeave={hide}
        >
          <button
            ref={btnRef}
            className={`more-btn ${open ? 'active' : ''}`}
            aria-label={`Показать все: ${title} (${totalCount})`}
            onClick={(e) => {
              e.stopPropagation();
              setOpen((v) => !v);
            }}
          >
            +{remaining}
          </button>

          {open &&
            createPortal(
              <div
                ref={popoverRef}
                style={popoverStyle}
                className="animate-[popoverIn_0.2s_cubic-bezier(0.16,1,0.3,1)_forwards]"
                onMouseEnter={keepOpen}
                onMouseLeave={hide}
              >
                <div className="popover-inner">
                  <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-b-[rgba(255,255,255,0.06)] text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {title}
                    <span className="inline-flex items-center justify-center min-w-[22px] h-[18px] px-1.5 rounded-[9px] bg-[rgba(255,255,255,0.08)] text-[10px] font-bold" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {totalCount}
                    </span>
                  </div>
                  <div className="p-3 max-h-[260px] overflow-y-auto scrollbar-none">
                    {type === 'language' ? (
                      <div className="grid grid-cols-2 gap-0.5">
                        {items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 px-2.5 py-2 rounded-lg transition-colors hover:bg-[rgba(255,255,255,0.06)]">
                            <span className="text-base leading-none flex-shrink-0">{item.flag}</span>
                            <span className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.8)' }}>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-5 gap-2">
                        {items.map((item, i) => (
                          <div key={i} className="flex flex-col items-center gap-1 group">
                            <div className="popover-icon-box group-hover:translate-y-[-2px] group-hover:shadow-md">
                              {item.abbr}
                            </div>
                            <div className="text-[8px] text-center leading-tight w-full truncate px-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                              {item.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Arrow */}
                <div
                  className="absolute -bottom-1.5 w-3 h-3 border-r border-b border-[rgba(255,255,255,0.1)]"
                  style={{
                    left: arrowLeft,
                    transform: 'translateX(-50%) rotate(45deg)',
                    background: 'rgba(26, 29, 36, 0.98)',
                  }}
                />
              </div>,
              document.body
            )}
        </div>
      )}
    </div>
  );
};

export default IconRowWithPopover;
