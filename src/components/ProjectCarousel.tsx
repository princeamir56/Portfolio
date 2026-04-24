import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import type { ProjectImage } from '../types/project';
import { cn } from '../lib/utils';

interface ProjectCarouselProps {
  images: ProjectImage[];
  title: string;
}

export function ProjectCarousel({ images, title }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-[1.6rem] border border-dashed border-[var(--color-border)] bg-[var(--color-surface-strong)] text-sm text-[var(--color-text-soft)]">
        Media preview coming soon
      </div>
    );
  }

  const goTo = (index: number) => {
    setActiveIndex((index + images.length) % images.length);
  };

  const activeImage = images[activeIndex];

  return (
    <div className="relative overflow-hidden rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)]">
      <img
        src={activeImage.src}
        alt={activeImage.alt}
        loading="lazy"
        className="aspect-[16/10] h-full w-full object-cover"
      />

      {images.length > 1 ? (
        <>
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white transition hover:bg-slate-950/90"
            aria-label={`Previous image for ${title}`}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-950/70 text-white transition hover:bg-slate-950/90"
            aria-label={`Next image for ${title}`}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950/60 px-3 py-2 backdrop-blur">
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                onClick={() => goTo(index)}
                className={cn(
                  'h-2.5 w-2.5 rounded-full transition',
                  index === activeIndex ? 'bg-[var(--color-accent)]' : 'bg-white/35',
                )}
                aria-label={`Show image ${index + 1} for ${title}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
