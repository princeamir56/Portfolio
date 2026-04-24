import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FolderGit2, PlayCircle, X } from 'lucide-react';
import type { Project } from '../types/project';
import { ProjectCarousel } from './ProjectCarousel';
import { formatProjectDate } from '../lib/utils';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenVideo: (project: Project) => void;
}

export function ProjectModal({
  project,
  onClose,
  onOpenVideo,
}: ProjectModalProps) {
  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.25 }}
            className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.22em] text-[var(--color-accent-text)] uppercase">
                  {project.categories.join(' • ')}
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm text-[var(--color-text-soft)]">
                  {formatProjectDate(project.date)}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <ProjectCarousel images={project.images} title={project.title} />

            <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <p className="text-base leading-8 text-[var(--color-text-soft)]">{project.description}</p>

                {project.achievements?.length ? (
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold text-[var(--color-text-strong)]">
                      Key Outcomes
                    </h4>
                    <ul className="mt-4 grid gap-3">
                      {project.achievements.map((achievement) => (
                        <li
                          key={achievement}
                          className="rounded-2xl border border-[var(--color-border)] bg-white/3 px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <aside className="space-y-5">
                <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <h4 className="text-lg font-semibold text-[var(--color-text-strong)]">Technology Stack</h4>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 text-xs text-[var(--color-text-soft)]"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.6rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <h4 className="text-lg font-semibold text-[var(--color-text-strong)]">Links</h4>
                  <div className="mt-4 grid gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
                    >
                      GitHub Repository
                        <FolderGit2 className="h-4 w-4" />
                    </a>
                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
                      >
                        Live Demo
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : null}
                    {project.video ? (
                      <button
                        type="button"
                        onClick={() => onOpenVideo(project)}
                        className="inline-flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3 text-sm text-[var(--color-text-strong)] transition hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
                      >
                        Watch Demo Video
                        <PlayCircle className="h-4 w-4" />
                      </button>
                    ) : null}
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
