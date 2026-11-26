import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { SITE, NAV_LINKS, GRID_PROJECTS, IMPACT_CASES, SOCIAL_LINKS } from '../lib/config';

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  category: 'Navigation' | 'Actions' | 'Projects' | 'Tech Stack' | 'Social';
  keywords?: string[];
  badge?: string;
  icon: (props: { className?: string }) => React.JSX.Element;
  onSelect: () => void;
}

// Minimalist Monochrome Titanium SVG Icons
const Icons = {
  Compass: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  ),
  Layers: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  Cpu: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  ),
  Briefcase: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  ),
  GitBranch: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="6" y1="3" x2="6" y2="15" />
      <circle cx="18" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M18 9a9 9 0 0 1-9 9" />
    </svg>
  ),
  Mail: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  Copy: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Download: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  ),
  Code: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
  Server: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  ExternalLink: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Search: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
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
  ),
  Check: ({ className = 'h-4 w-4' }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMac, setIsMac] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Detect OS for shortcut glyph
  useEffect(() => {
    setIsMac(typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform));
  }, []);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToastMessage(msg);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const scrollToId = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 80);
  };

  // Build Command Catalog
  const allCommands: CommandItem[] = useMemo(
    () => [
      // 1. Navigation
      {
        id: 'nav-about',
        title: 'Go to About / Bio',
        subtitle: 'Career snapshot, philosophy & background',
        category: 'Navigation',
        keywords: ['about', 'bio', 'whoami', 'profile', 'story'],
        badge: '#about',
        icon: Icons.Compass,
        onSelect: () => scrollToId('about'),
      },
      {
        id: 'nav-projects',
        title: 'Go to Selected Projects',
        subtitle: 'Production systems, architecture & code',
        category: 'Navigation',
        keywords: ['projects', 'work', 'showcase', 'portfolio', 'systems'],
        badge: '#projects',
        icon: Icons.Layers,
        onSelect: () => scrollToId('projects'),
      },
      {
        id: 'nav-stack',
        title: 'Go to Engineering Stack',
        subtitle: 'Languages, frameworks, databases & infrastructure',
        category: 'Navigation',
        keywords: ['stack', 'tech', 'skills', 'tools', 'backend', 'java'],
        badge: '#stack',
        icon: Icons.Cpu,
        onSelect: () => scrollToId('stack'),
      },
      {
        id: 'nav-experience',
        title: 'Go to Work Experience',
        subtitle: 'Askrindo, MSIG Life, XL Axiata timeline',
        category: 'Navigation',
        keywords: ['experience', 'career', 'jobs', 'companies', 'timeline'],
        badge: '#experience',
        icon: Icons.Briefcase,
        onSelect: () => scrollToId('experience'),
      },
      {
        id: 'nav-github',
        title: 'Go to GitHub Activity',
        subtitle: '800+ commits, repositories & open source',
        category: 'Navigation',
        keywords: ['github', 'commits', 'activity', 'code', 'open source'],
        badge: '#github',
        icon: Icons.GitBranch,
        onSelect: () => scrollToId('github'),
      },
      {
        id: 'nav-contact',
        title: 'Go to Contact',
        subtitle: 'Send message, schedule meeting or inquire',
        category: 'Navigation',
        keywords: ['contact', 'email', 'message', 'hire', 'freelance'],
        badge: '#contact',
        icon: Icons.Mail,
        onSelect: () => scrollToId('contact'),
      },

      // 2. Actions
      {
        id: 'action-copy-email',
        title: `Copy Email (${SITE.email})`,
        subtitle: 'Copy single source of truth email to clipboard',
        category: 'Actions',
        keywords: ['copy', 'email', 'address', 'mail', 'clipboard'],
        badge: 'Action',
        icon: Icons.Copy,
        onSelect: () => {
          navigator.clipboard.writeText(SITE.email);
          showToast(`Copied ${SITE.email} to clipboard!`);
          setIsOpen(false);
        },
      },
      {
        id: 'action-download-cv',
        title: 'Download Resume (PDF)',
        subtitle: 'Curriculum Vitae with 6+ years experience summary',
        category: 'Actions',
        keywords: ['cv', 'resume', 'pdf', 'download', 'hire'],
        badge: 'PDF',
        icon: Icons.Download,
        onSelect: () => {
          window.open(SITE.cvUrl, '_blank');
          showToast('Downloading Riyan Sugiarto Resume (PDF)...');
          setIsOpen(false);
        },
      },
      {
        id: 'action-send-email',
        title: 'Send Direct Email',
        subtitle: `Open default email client to ${SITE.email}`,
        category: 'Actions',
        keywords: ['mail', 'mailto', 'send', 'inquire'],
        badge: 'Mailto',
        icon: Icons.Mail,
        onSelect: () => {
          window.location.href = `mailto:${SITE.email}`;
          setIsOpen(false);
        },
      },

      // 3. Projects Jump
      ...GRID_PROJECTS.map(p => ({
        id: `proj-${p.slug}`,
        title: p.title,
        subtitle: `${p.company} · ${p.tech.slice(0, 3).join(', ')}`,
        category: 'Projects' as const,
        keywords: [
          p.title.toLowerCase(),
          p.company.toLowerCase(),
          ...p.tech.map(t => t.toLowerCase()),
        ],
        badge: p.company,
        icon: Icons.Server,
        onSelect: () => scrollToId('projects'),
      })),

      // 4. Tech Stack Searches
      {
        id: 'stack-java',
        title: 'Java & Spring Boot Ecosystem',
        subtitle: 'Microservices, Spring Cloud, Spring Batch & JPA/Hibernate',
        category: 'Tech Stack',
        keywords: ['java', 'spring', 'boot', 'cloud', 'batch', 'jvm', 'backend'],
        badge: 'Core',
        icon: Icons.Code,
        onSelect: () => scrollToId('stack'),
      },
      {
        id: 'stack-kafka',
        title: 'Apache Kafka & Distributed Streaming',
        subtitle: 'Manual offset commits, zero-loss SLAs, event-driven pipelines',
        category: 'Tech Stack',
        keywords: ['kafka', 'solace', 'rabbitmq', 'stream', 'event', 'queue'],
        badge: 'Streaming',
        icon: Icons.Code,
        onSelect: () => scrollToId('stack'),
      },
      {
        id: 'stack-db',
        title: 'PostgreSQL, SQL Server & Redis Locks',
        subtitle: 'Two-layer Redis mutex (NX EX) + SELECT ... FOR UPDATE',
        category: 'Tech Stack',
        keywords: ['postgres', 'postgresql', 'sql', 'redis', 'database', 'lock', 'acid'],
        badge: 'Data',
        icon: Icons.Code,
        onSelect: () => scrollToId('stack'),
      },
      {
        id: 'stack-quarkus',
        title: 'Quarkus & Cloud-Native Runtimes',
        subtitle: 'High-density microservices cutting memory >60% (<300MB)',
        category: 'Tech Stack',
        keywords: ['quarkus', 'cloud native', 'memory', 'graalvm', 'reactive'],
        badge: 'Cloud Native',
        icon: Icons.Code,
        onSelect: () => scrollToId('stack'),
      },

      // 5. Social & External Links
      ...SOCIAL_LINKS.filter(s => s.name !== 'Email').map(s => ({
        id: `social-${s.name.toLowerCase()}`,
        title: `${s.name} Profile`,
        subtitle: s.label,
        category: 'Social' as const,
        keywords: [s.name.toLowerCase(), s.label.toLowerCase(), 'social', 'profile'],
        badge: 'External',
        icon: Icons.ExternalLink,
        onSelect: () => {
          window.open(s.url, '_blank', 'noopener,noreferrer');
          setIsOpen(false);
        },
      })),
    ],
    [],
  );

  // Filter commands by search query
  const filteredCommands = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allCommands;

    return allCommands.filter(cmd => {
      const inTitle = cmd.title.toLowerCase().includes(q);
      const inSub = cmd.subtitle?.toLowerCase().includes(q) ?? false;
      const inCat = cmd.category.toLowerCase().includes(q);
      const inKeywords = cmd.keywords?.some(k => k.includes(q)) ?? false;
      return inTitle || inSub || inCat || inKeywords;
    });
  }, [search, allCommands]);

  // Keep selection bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Global keydown listener for Cmd+K / Ctrl+K & modal navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle palette: Cmd+K (Mac) or Ctrl+K (Win/Linux)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        return;
      }

      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1 < filteredCommands.length ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 >= 0 ? prev - 1 : filteredCommands.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].onSelect();
        }
      }
    };

    const handleCustomOpen = () => {
      setIsOpen(true);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-command-palette', handleCustomOpen);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-command-palette', handleCustomOpen);
    };
  }, [isOpen, filteredCommands, selectedIndex]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSearch('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Scroll active item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const selectedEl = listRef.current.querySelector<HTMLElement>(
      `[data-cmd-index="${selectedIndex}"]`,
    );
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex, isOpen]);

  return (
    <>
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 flex items-center gap-2.5 rounded-full bg-[#18181B] px-4 py-2 shadow-[0_12px_32px_rgba(0,0,0,0.85)] backdrop-blur-md"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <Icons.Check className="h-3 w-3" />
            </span>
            <span className="text-xs font-medium text-white">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Modal Dialog Card (Raycast / Titanium Pro Style) */}
            <motion.div
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -12 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
              className="relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-[#121214] shadow-[0_32px_80px_rgba(0,0,0,0.95)]"
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
            >
              {/* Search Header Bar */}
              <div className="relative flex items-center px-4 py-3.5">
                <Icons.Search className="h-4 w-4 shrink-0 text-[#8E8E93]" />
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Type a command or search (e.g. 'Kafka', 'Projects', 'Email')..."
                  className="ml-3 flex-1 bg-transparent text-sm font-medium text-white placeholder-[#71717A] outline-none"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="mr-2 rounded px-1.5 py-0.5 text-[10px] font-mono text-[#71717A] hover:text-white"
                  >
                    Clear
                  </button>
                )}
                <kbd className="hidden sm:inline-flex items-center rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#A1A1AA]">
                  ESC
                </kbd>
              </div>

              {/* Commands List */}
              <div
                ref={listRef}
                className="max-h-[380px] overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-white/10"
              >
                {filteredCommands.length === 0 ? (
                  <div className="py-12 text-center">
                    <p className="text-sm font-medium text-[#8E8E93]">
                      No commands found for "{search}"
                    </p>
                    <p className="mt-1 text-xs text-[#52525B]">
                      Try searching for 'projects', 'stack', or 'email'.
                    </p>
                  </div>
                ) : (
                  filteredCommands.map((cmd, idx) => {
                    const isSelected = idx === selectedIndex;
                    const IconComponent = cmd.icon;

                    return (
                      <div
                        key={cmd.id}
                        data-cmd-index={idx}
                        onClick={() => cmd.onSelect()}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 transition-colors duration-150 ${
                          isSelected
                            ? 'bg-white/10 text-white'
                            : 'text-[#A1A1AA] hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                              isSelected
                                ? 'bg-white/15 text-white'
                                : 'bg-white/[0.04] text-[#8E8E93]'
                            }`}
                          >
                            <IconComponent className="h-4 w-4" />
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="truncate text-xs font-semibold text-white">
                              {cmd.title}
                            </span>
                            {cmd.subtitle && (
                              <span className="truncate text-[11px] text-[#71717A] group-hover:text-[#A1A1AA]">
                                {cmd.subtitle}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          {cmd.badge && (
                            <span className="rounded-full bg-white/[0.06] px-2 py-0.5 font-mono text-[9px] font-medium text-[#A1A1AA]">
                              {cmd.badge}
                            </span>
                          )}
                          {isSelected && (
                            <span className="font-mono text-[11px] text-white/80">↵</span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Status Footer */}
              <div className="flex items-center justify-between bg-[#0A0A0C] px-4 py-2.5 font-mono text-[10px] text-[#71717A]">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded bg-white/10 px-1 text-white/80">↑</kbd>
                    <kbd className="rounded bg-white/10 px-1 text-white/80">↓</kbd>
                    to navigate
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <kbd className="rounded bg-white/10 px-1 text-white/80">↵</kbd>
                    to select
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-[#52525B]">
                  <span>Toggle anywhere with</span>
                  <kbd className="rounded bg-white/10 px-1 text-white/80">
                    {isMac ? '⌘K' : 'Ctrl+K'}
                  </kbd>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
