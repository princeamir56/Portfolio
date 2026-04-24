import { useEffect, useMemo, useState } from 'react';
import {
  BarChart3,
  Blocks,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Database,
  FileBadge,
  GraduationCap,
  Home,
  Mail,
  Menu,
  MoonStar,
  Search,
  Sparkles,
  SunMedium,
  UserRound,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import profileImage from './assets/profile.png';
import {
  about as staticAbout,
  certifications as staticCertifications,
  contact as staticContact,
  education as staticEducation,
  experience as staticExperience,
  hero as staticHero,
  languages as staticLanguages,
  navigationItems,
  skills as staticSkills,
} from './content/profile';
import { projects as staticProjects } from './data/projects';
import { useTheme } from './hooks/useTheme';
import type { Project, ProjectCategory } from './types/project';
import { Section } from './components/Section';
import { SectionHeading } from './components/SectionHeading';
import { ProjectCard } from './components/ProjectCard';
import { ProjectModal } from './components/ProjectModal';
import { VideoModal } from './components/VideoModal';
import { SocialLink } from './components/SocialLink';
import { CertificationCard } from './components/CertificationCard';
import { cn, formatProjectDate } from './lib/utils';

const iconMap: Record<string, any> = {
  BrainCircuit, Database, Code2, Blocks, BarChart3,
};

const categoryOptions: Array<ProjectCategory | 'All'> = ['All', 'AI', 'ML', 'Data', 'Web'];

const sectionIcons = {
  home: Home,
  about: UserRound,
  skills: Sparkles,
  projects: BrainCircuit,
  experience: BriefcaseBusiness,
  education: GraduationCap,
  credentials: FileBadge,
  contact: Mail,
};

function App() {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [videoProject, setVideoProject] = useState<Project | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [hero, setHero] = useState(staticHero);
  const [about, setAbout] = useState(staticAbout);
  const [skills, setSkills] = useState<any[]>(staticSkills as any);
  const [experience, setExperience] = useState(staticExperience);
  const [education, setEducation] = useState(staticEducation);
  const [certifications, setCertifications] = useState<any[]>(staticCertifications);
  const [languages, setLanguages] = useState(staticLanguages);
  const [contact, setContact] = useState(staticContact);
  const [projects, setProjects] = useState<Project[]>(staticProjects);

  useEffect(() => {
    const applyProfile = (profile: any) => {
      if (profile.hero) setHero(profile.hero);
      if (profile.about) setAbout(profile.about);
      if (profile.skills) setSkills(profile.skills);
      if (profile.experience) setExperience(profile.experience);
      if (profile.education) setEducation(profile.education);
      if (profile.certifications) setCertifications(profile.certifications);
      if (profile.languages) setLanguages(profile.languages);
      if (profile.contact) setContact(profile.contact);
    };

    fetch('/data/profile.json').then((r) => {
      if (!r.ok) throw new Error();
      return r.json();
    }).then(applyProfile).catch(() => {});

    fetch('/data/projects.json').then((r) => {
      if (!r.ok) throw new Error();
      return r.json();
    }).then((data) => {
      if (Array.isArray(data) && data.length > 0) setProjects(data);
    }).catch(() => {});
  }, []);

  useEffect(() => {
    document.title = `${hero.name} | ${hero.title}`;
  }, [hero.name, hero.title]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory = activeCategory === 'All' || project.categories.includes(activeCategory);
      if (!normalizedQuery) return matchesCategory;
      const searchTarget = [project.title, project.summary, project.description, project.technologies.join(' '), project.categories.join(' ')].join(' ').toLowerCase();
      return matchesCategory && searchTarget.includes(normalizedQuery);
    });
  }, [activeCategory, query, projects]);

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured).sort(sortProjectsByDate),
    [projects],
  );

  const visibleProjects = useMemo(
    () => filteredProjects.sort(sortProjectsByDate),
    [filteredProjects],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_var(--page-glow-1),_transparent_32%),radial-gradient(circle_at_80%_20%,_var(--page-glow-2),_transparent_22%),linear-gradient(180deg,_var(--color-bg)_0%,_var(--color-bg-soft)_100%)] text-[var(--color-text)] transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />

      <header className="fixed inset-x-0 top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-start justify-between px-4 pt-4 sm:px-6 lg:px-8 lg:pt-6">
         

          <nav className="mx-auto hidden items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color:var(--color-surface)/0.86] px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:flex">
            {navigationItems.map((item) => {
              const Icon = sectionIcons[item.id];
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm text-[var(--color-text-soft)] transition duration-300 hover:border-[var(--color-border)] hover:bg-[var(--color-surface-strong)] hover:text-[var(--color-text-strong)]"
                >
                  <Icon className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[color:var(--color-surface)/0.82] p-1.5 backdrop-blur-xl">
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-strong)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-strong)]"
              aria-label={`Switch theme. Current theme: ${theme === 'system' ? resolvedTheme : theme}`}
            >
              {resolvedTheme === 'dark' ? <SunMedium className="h-5 w-5" /> : <MoonStar className="h-5 w-5" />}
            </button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-strong)] transition duration-300 hover:border-[var(--color-accent-strong)]/40 lg:hidden"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mx-4 mt-3 overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[color:var(--color-surface)/0.95] shadow-[0_20px_50px_rgba(0,0,0,0.14)] backdrop-blur-xl lg:hidden sm:mx-6"
            >
              <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
                {navigationItems.map((item) => {
                  const Icon = sectionIcons[item.id];
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="inline-flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-[var(--color-text-soft)] transition duration-300 hover:bg-[var(--color-surface-strong)] hover:text-[var(--color-text-strong)]"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <main className="relative z-10">
        <Section id="home" className="pt-28 sm:pt-32 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="space-y-8"
            >
              <div className="mb-6 flex flex-col items-start gap-8 sm:mb-8 sm:gap-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.92, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.08 }}
                  className="relative mb-4 sm:mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-[-14px] rounded-full bg-[conic-gradient(from_0deg,_var(--color-accent)_0deg,_transparent_70deg,_var(--color-accent-strong)_180deg,_transparent_250deg,_var(--color-accent)_360deg)] opacity-80 blur-[2px]"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute inset-[-24px] rounded-full border border-[var(--color-accent-strong)]/18"
                  />
                  <div className="relative h-44 w-44 overflow-hidden rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface-strong)] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] sm:h-52 sm:w-52 lg:h-64 lg:w-64">
                    <img
                      src={profileImage}
                      alt={`${hero.name} profile`}
                      className="h-full w-full rounded-full object-cover"
                      loading="eager"
                    />
                  </div>
                </motion.div>

                <div className="relative z-10 inline-flex items-center gap-3 rounded-full border border-[var(--color-accent-strong)]/20 bg-[var(--color-accent-soft)] px-4 py-2 text-sm text-[var(--color-accent-text)] shadow-[0_0_30px_var(--color-accent-soft)]">
                  <Sparkles className="h-4 w-4" />
                  Business Intelligence engineering student crafting AI-driven products
                </div>
              </div>

              <div className="space-y-5">
                <p className="text-sm font-semibold tracking-[0.36em] text-[var(--color-text-soft)] uppercase">
                  {hero.location}
                </p>
                <h1 className="max-w-4xl font-display text-5xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)] sm:text-6xl lg:text-7xl">
                  {hero.name}
                </h1>
                <p className="max-w-3xl text-xl text-[var(--color-hero-title)] sm:text-2xl">
                  {hero.title}
                </p>
                <p className="max-w-3xl text-base leading-8 text-[var(--color-text-soft)] sm:text-lg">
                  {hero.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <a href="#projects" className="inline-flex items-center justify-center rounded-full border border-[var(--color-button-primary-border)] bg-[image:var(--color-button-primary)] px-7 py-4 text-sm font-semibold text-[var(--color-button-primary-text)] shadow-[0_14px_34px_var(--color-button-primary-shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_var(--color-button-primary-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]">
                  View Projects
                </a>
                <a href="#contact" className="inline-flex items-center justify-center rounded-full border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-7 py-4 text-sm font-semibold text-[var(--color-text-strong)] transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-strong)]/40 hover:text-[var(--color-accent-strong)]">
                  Contact
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {(hero.socials || []).map((social) => (
                  <SocialLink key={social.label} {...social} />
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -top-10 right-10 h-36 w-36 rounded-full bg-[var(--page-glow-1)] blur-3xl" />
              <div className="absolute -bottom-8 left-8 h-40 w-40 rounded-full bg-[var(--page-glow-2)] blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-hero-panel)] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  {(hero.metrics || []).map((metric) => (
                    <div key={metric.label} className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-card-subtle)] p-5">
                      <p className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">{metric.value}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{metric.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <p className="text-sm font-medium text-[var(--color-text-soft)]">Current focus</p>
                    <span className="rounded-full border border-[var(--color-success-border)] bg-[var(--color-success-soft)] px-3 py-1 text-xs font-medium text-[var(--color-success-text)]">
                      Open to internships
                    </span>
                  </div>
                  <ul className="space-y-4">
                    {(hero.focusAreas || []).map((focus) => (
                      <li key={focus.title} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-subtle)] p-4">
                        <p className="font-medium text-[var(--color-text-strong)]">{focus.title}</p>
                        <p className="mt-2 text-sm leading-6 text-[var(--color-text-soft)]">{focus.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section id="about">
          <SectionHeading
            eyebrow="About Me"
            title="Building useful software at the intersection of product, data, and intelligence."
            description={about.summary}
          />
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              <p className="text-lg leading-8 text-[var(--color-text-soft)]">{about.story}</p>
            </div>
            <div className="grid gap-4">
              {(about.highlights || []).map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
                  <p className="text-base font-semibold text-[var(--color-text-strong)]">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        <Section id="skills">
          <SectionHeading
            eyebrow="Skills"
            title="A toolkit shaped for product engineering, machine learning, and business intelligence."
            description="Each category is designed to support end-to-end delivery, from raw data to deployable applications."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {skills.map((group: any) => {
              const Icon = typeof group.icon === 'string' ? (iconMap[group.icon] || Sparkles) : group.icon;
              return (
                <motion.article
                  key={group.title}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-[1.8rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--color-accent-strong)]/20 bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[var(--color-text-strong)]">{group.title}</h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item: string) => (
                      <span key={item} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-soft)]">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Section>

        <Section id="projects">
          <SectionHeading
            eyebrow="Projects"
            title="A dynamic project system built to grow with the portfolio."
            description="Projects are rendered from a typed data source, so new work can be added by dropping a single object into the dataset."
          />

          <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="flex flex-wrap gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition duration-300',
                    activeCategory === category
                      ? 'border-[var(--color-accent-strong)]/35 bg-[var(--color-accent-soft)] text-[var(--color-accent-text)]'
                      : 'border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-soft)] hover:border-[var(--color-accent-strong)]/30 hover:text-[var(--color-text-strong)]',
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            <label className="flex items-center gap-3 rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
              <Search className="h-4 w-4 text-[var(--color-text-soft)]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search projects, tools, domains..."
                className="w-full min-w-0 bg-transparent text-sm text-[var(--color-text-strong)] outline-none placeholder:text-[var(--color-text-soft)] sm:min-w-80"
              />
            </label>
          </div>

          <div className="mb-10">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">Featured Work</h3>
              <span className="text-sm text-[var(--color-text-soft)]">{featuredProjects.length} spotlight projects</span>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} featured onOpenDetails={setSelectedProject} onOpenVideo={setVideoProject} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">All Projects</h3>
              <span className="text-sm text-[var(--color-text-soft)]">{visibleProjects.length} matching results</span>
            </div>
            <div className="grid gap-6 xl:grid-cols-2">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} onOpenDetails={setSelectedProject} onOpenVideo={setVideoProject} />
              ))}
            </div>
            {visibleProjects.length === 0 ? (
              <div className="rounded-[2rem] border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center text-[var(--color-text-soft)]">
                No projects match this search right now. Try another keyword or switch categories.
              </div>
            ) : null}
          </div>
        </Section>

        <Section id="experience">
          <SectionHeading
            eyebrow="Experience"
            title="Hands-on product engineering experience in mobile, backend, and enterprise data systems."
            description="A cross-functional internship foundation in app development, APIs, and database-backed workflows."
          />
          <div className="space-y-5">
            {experience.map((item) => (
              <article key={item.company} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div>
                    <p className="text-sm font-semibold tracking-[0.22em] text-[var(--color-accent-text)] uppercase">{item.period}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">{item.role}</h3>
                    <p className="mt-2 text-base text-[var(--color-text-soft)]">{item.company} &bull; {item.location}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.stack.map((tool) => (
                      <span key={tool} className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-3 py-1.5 text-xs text-[var(--color-text-soft)]">{tool}</span>
                    ))}
                  </div>
                </div>
                <ul className="mt-6 grid gap-3">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card-subtle)] px-4 py-4 text-sm leading-7 text-[var(--color-text-soft)]">{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Section>

        <Section id="education">
          <SectionHeading
            eyebrow="Education"
            title="An academic path centered on computer science, analytics, and business intelligence engineering."
            description="Formal training that supports both rigorous technical work and business-facing decision systems."
          />
          <div className="grid gap-6 lg:grid-cols-2">
            {education.map((item) => (
              <article key={item.degree} className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                <p className="text-sm font-semibold tracking-[0.22em] text-[var(--color-accent-text)] uppercase">{item.period}</p>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">{item.degree}</h3>
                <p className="mt-3 text-base text-[var(--color-text-soft)]">{item.school}</p>
                <p className="mt-6 text-sm leading-7 text-[var(--color-text-soft)]">{item.description}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="credentials">
          <SectionHeading
            eyebrow="Certifications & Languages"
            title="Signals of continuous learning, communication, and global collaboration."
            description="Certifications support technical credibility, while language skills help bridge teams and contexts."
          />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              <h3 className="text-xl font-semibold text-[var(--color-text-strong)]">Certifications</h3>
              <div className="mt-6 grid gap-4">
                {certifications.map((cert: any) => (
                  <CertificationCard key={cert.name} cert={cert} />
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              <h3 className="text-xl font-semibold text-[var(--color-text-strong)]">Languages</h3>
              <div className="mt-6 grid gap-4">
                {languages.map((language) => (
                  <div key={language.name} className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-medium text-[var(--color-text-strong)]">{language.name}</p>
                      <span className="text-sm text-[var(--color-accent-text)]">{language.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </Section>

        <Section id="contact" className="pb-20">
          <SectionHeading
            eyebrow="Contact"
            title="Let's build software, analytics, and intelligent systems that create real-world value."
            description="For internships, freelance opportunities, hackathons, or collaboration, the easiest path is a direct message."
          />
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              <p className="max-w-2xl text-base leading-8 text-[var(--color-text-soft)]">{contact.summary}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {(contact.methods || []).map((method) => (
                  <a
                    key={method.label}
                    href={method.href}
                    target={method.external ? '_blank' : undefined}
                    rel={method.external ? 'noreferrer' : undefined}
                    className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-strong)] p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent-strong)]/40"
                  >
                    <p className="text-sm text-[var(--color-text-soft)]">{method.label}</p>
                    <p className="mt-2 text-base font-medium text-[var(--color-text-strong)]">{method.value}</p>
                  </a>
                ))}
              </div>
            </article>

            <article className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
              <div className="mb-6">
                <p className="text-sm font-semibold tracking-[0.22em] text-[var(--color-accent-text)] uppercase">Quick Contact</p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-strong)]">Prefer a simple message flow?</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--color-text-soft)]">
                  This form routes through the default email client for a frictionless static deployment.
                </p>
              </div>
              <form className="space-y-4" action={`mailto:${contact.email}`} method="post" encType="text/plain">
                <input type="text" name="name" placeholder="Your name" className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3.5 text-sm text-[var(--color-text-strong)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent-strong)]/50" />
                <input type="email" name="email" placeholder="Your email" className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3.5 text-sm text-[var(--color-text-strong)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent-strong)]/50" />
                <textarea name="message" rows={5} placeholder="Tell me about your project, opportunity, or idea." className="w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-strong)] px-4 py-3.5 text-sm text-[var(--color-text-strong)] outline-none transition placeholder:text-[var(--color-text-soft)] focus:border-[var(--color-accent-strong)]/50" />
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full border border-[var(--color-button-primary-border)] bg-[image:var(--color-button-primary)] px-6 py-3.5 text-sm font-semibold text-[var(--color-button-primary-text)] shadow-[0_14px_34px_var(--color-button-primary-shadow)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_42px_var(--color-button-primary-shadow)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent-strong)]/55 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]">
                  Send Message
                </button>
              </form>
            </article>
          </div>
        </Section>
      </main>

      <footer className="relative z-10 border-t border-[var(--color-border)] bg-[var(--color-surface)]/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-sm text-[var(--color-text-soft)] sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <p>&copy; 2026 {hero.name}.</p>
          <p>{formatProjectDate(featuredProjects[0]?.date ?? '2026-01')}</p>
        </div>
      </footer>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} onOpenVideo={setVideoProject} />
      <VideoModal project={videoProject} onClose={() => setVideoProject(null)} />
    </div>
  );
}

function sortProjectsByDate(a: Project, b: Project) {
  return b.date.localeCompare(a.date);
}

export default App;
