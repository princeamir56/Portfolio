import { useEffect } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';
import { cn } from '../../lib/utils';

export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope, { once: true });
  const wordsArray = words.split(' ');

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        { opacity: 1, filter: filter ? 'blur(0px)' : 'none' },
        { duration, delay: stagger(0.05) },
      );
    }
  }, [isInView, animate, filter, duration]);

  return (
    <div className={cn(className)} ref={scope}>
      <div className="leading-snug">
        {wordsArray.map((word, idx) => (
          <motion.span
            key={word + idx}
            className="text-[var(--color-text-soft)] opacity-0"
            style={{ filter: filter ? 'blur(10px)' : 'none' }}
          >
            {word}{' '}
          </motion.span>
        ))}
      </div>
    </div>
  );
}
