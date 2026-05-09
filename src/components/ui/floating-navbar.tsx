import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  link: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  rightContent?: React.ReactNode;
}

export function FloatingNav({ navItems, className, rightContent }: FloatingNavProps) {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setAtTop(currentScrollY < 50);
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        initial={{ opacity: 1, y: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={cn(
          'fixed inset-x-0 top-4 z-[5000] mx-auto flex max-w-2xl items-center justify-center gap-1 rounded-full border px-4 py-2 shadow-lg',
          atTop
            ? 'border-transparent bg-transparent shadow-none'
            : 'border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl',
          className,
        )}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.link}
            className="relative flex items-center gap-1 rounded-full px-3 py-2 text-sm text-[var(--color-text-soft)] transition-colors hover:text-[var(--color-text)]"
          >
            {item.icon && <span className="block sm:hidden">{item.icon}</span>}
            <span className="hidden sm:block">{item.name}</span>
          </a>
        ))}
        {rightContent}
      </motion.nav>
    </AnimatePresence>
  );
}
