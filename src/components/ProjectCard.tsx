import { ExternalLink, FolderGit2, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Project } from '../types/project';
import { ProjectCarousel } from './ProjectCarousel';
import { formatProjectDate } from '../lib/utils';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onOpenDetails: (project: Project) => void;
  onOpenVideo: (project: Project) => void;
}

export function ProjectCard({
  project,
  featured = false,
  onOpenDetails,
  onOpenVideo,
}: ProjectCardProps) {
  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] transition-shadow duration-500 hover:shadow-[0_30px_80px_-20px_var(--color-button-primary-shadow)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[2rem] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'linear-gradient(130deg, transparent 30%, var(--color-accent-soft) 50%, transparent 70%)',
          mixBlendMode: 'overlay',
        }}
      />
      <div className="relative p-5 [&_img]:transition-transform [&_img]:duration-700 [&_img]:ease-out group-hover:[&_img]:scale-[1.04]">
        <ProjectCarousel images={project.images} title={project.title} />
      </div>

      <div className="px-6 pb-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {project.categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-[var(--color-accent-strong)]/20 bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-[var(--color-accent-text)] uppercase"
              >
                {category}
              </span>
            ))}
            {featured ? (
              <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-[11px] font-semibold tracking-[0.2em] text-amber-600 dark:text-amber-200 uppercase">
                Featured
              </span>
            ) : null}
          </div>
          <span className="text-sm text-[var(--color-text-soft)]">{formatProjectDate(project.date)}</span>
        </div>

        <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">
          {project.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-text-soft)]">{project.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 text-xs text-[var(--color-text-soft)]"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm text-[var(--color-text-strong)] transition duration-300 hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
          >
            <FolderGit2 className="h-4 w-4" />
            GitHub
          </a>

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm text-[var(--color-text-strong)] transition duration-300 hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
            >
              <ExternalLink className="h-4 w-4" />
              Live Demo
            </a>
          ) : null}

          {project.video ? (
            <button
              type="button"
              onClick={() => onOpenVideo(project)}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-2.5 text-sm text-[var(--color-text-strong)] transition duration-300 hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-text)]"
            >
              <PlayCircle className="h-4 w-4" />
              Watch Video
            </button>
          ) : null}

          <button
            type="button"
            onClick={() => onOpenDetails(project)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-button-primary-border)] bg-[image:var(--color-button-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--color-button-primary-text)] shadow-[0_12px_28px_var(--color-button-primary-shadow)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_var(--color-button-primary-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.article>
  );
}
