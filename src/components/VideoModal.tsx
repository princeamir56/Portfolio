import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { Project } from '../types/project';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '../lib/utils';

interface VideoModalProps {
  project: Project | null;
  onClose: () => void;
}

export function VideoModal({ project, onClose }: VideoModalProps) {
  if (!project?.video) {
    return null;
  }

  const youtubeVideo = isYouTubeUrl(project.video);
  const videoTitle = `${project.title} demo video`;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          className="w-full max-w-5xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.22em] text-[var(--color-accent-text)] uppercase">Video Demo</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
              aria-label="Close video modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-slate-950">
            {youtubeVideo ? (
              <iframe
                title={videoTitle}
                src={getYouTubeEmbedUrl(project.video)}
                className="aspect-video w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video controls className="aspect-video w-full" preload="metadata">
                <source src={project.video} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
