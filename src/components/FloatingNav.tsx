import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { NAV_LINKS, SITE } from '../lib/config';

export function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState<string>('about');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y >= 300);

      const marker = y + window.innerHeight * 0.35;
      let current: string = NAV_LINKS[0].id;
      for (const item of NAV_LINKS) {
        const el = document.getElementById(item.id);
        if (el && el.offsetTop <= marker) {
          current = item.id;
        }
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const openPalette = () => {
    window.dispatchEvent(new CustomEvent('open-command-palette'));
  };

  return (
    <header
      aria-hidden={!visible}
      className={`fixed top-5 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ease-out ${
        visible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-4 opacity-0'
      }`}
    >
      <nav
        aria-label="Primary navigation"
        onMouseLeave={() => setHoveredId(null)}
        className="flex items-center gap-2 rounded-full bg-[#121214]/90 px-3 py-1.5 shadow-[0_14px_36px_rgba(0,0,0,0.7)] backdrop-blur-md"
      >
        <div className="hidden items-center gap-1 sm:flex">
          {NAV_LINKS.map(item => {
            const isActive = activeId === item.id;
            const isHovered = hoveredId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActiveId(item.id)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-[#FFFFFF]' : 'text-[#8E8E93] hover:text-[#FFFFFF]'
                }`}
              >
                {/* Smooth sliding hover background */}
                {isHovered && !reduceMotion && (
                  <motion.span
                    layoutId="nav-hover-pill"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    className="absolute inset-0 z-0 rounded-full bg-white/10"
                  />
                )}

                <span className="relative z-10">{item.label}</span>

                {/* Glowing active indicator dot with spring physics */}
                {isActive && (
                  <motion.span
                    layoutId={reduceMotion ? undefined : 'floating-nav-dot'}
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    aria-hidden="true"
                    className="absolute bottom-0.5 left-1/2 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-[#FFFFFF] shadow-[0_0_8px_#FFFFFF]"
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Command Palette Trigger Button (⌘K / Ctrl+K) */}
        <button
          type="button"
          onClick={openPalette}
          aria-label="Open Command Palette (Cmd+K)"
          title="Open Command Palette (Cmd+K / Ctrl+K)"
          className="flex items-center gap-1.5 rounded-full bg-white/[0.08] px-2.5 py-1.5 text-xs text-[#8E8E93] hover:bg-white/15 hover:text-white transition-all duration-200"
        >
          <svg
            className="h-3.5 w-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="hidden sm:inline font-mono text-[10px] text-[#A1A1AA]">⌘K</span>
        </button>

        <button
          type="button"
          onClick={() => setMenuOpen(v => !v)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation menu"
          className="rounded-full bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-[#FFFFFF] sm:hidden"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <motion.a
          whileHover={reduceMotion ? undefined : { scale: 1.05, y: -1 }}
          whileTap={reduceMotion ? undefined : { scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          href={`mailto:${SITE.email}`}
          className="rounded-full bg-[#FFFFFF] px-4 py-1.5 text-sm font-bold whitespace-nowrap text-[#080808] shadow-md transition-all hover:bg-[#E4E4E7]"
        >
          Hire Me
        </motion.a>
      </nav>

      {menuOpen && (
        <div className="mt-2 flex flex-col gap-1 rounded-2xl bg-[#121214] p-2 shadow-[0_14px_34px_rgba(0,0,0,0.7)] sm:hidden">
          {NAV_LINKS.map(item => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-4 py-2 text-sm font-medium text-[#F8FAFC] hover:bg-white/10"
            >
              {item.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              openPalette();
            }}
            className="flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-[#E4E4E7] hover:bg-white/10 text-left"
          >
            <svg
              className="h-4 w-4 text-[#8E8E93]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            Command Palette (⌘K)
          </button>
        </div>
      )}
    </header>
  );
}
