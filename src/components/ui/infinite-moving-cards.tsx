import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export function InfiniteMovingCards({
  items,
  direction = 'left',
  speed = 'normal',
  pauseOnHover = true,
  className,
  renderItem,
}: {
  items: any[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
  renderItem: (item: any, index: number) => React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;

    const scrollerContent = Array.from(scrollerRef.current.children);
    scrollerContent.forEach((item) => {
      const duplicated = item.cloneNode(true);
      scrollerRef.current!.appendChild(duplicated);
    });

    const speedMap = { fast: '20s', normal: '40s', slow: '80s' };
    containerRef.current.style.setProperty('--animation-duration', speedMap[speed]);
    containerRef.current.style.setProperty('--animation-direction', direction === 'left' ? 'forwards' : 'reverse');
    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn('scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]', className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item, idx) => (
          <li key={idx} className="w-[300px] max-w-full flex-shrink-0 md:w-[350px]">
            {renderItem(item, idx)}
          </li>
        ))}
      </ul>
    </div>
  );
}
