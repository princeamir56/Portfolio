export type ProjectCategory = 'AI' | 'ML' | 'Data' | 'Web';

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  images: ProjectImage[];
  video?: string;
  featured: boolean;
  date: string;
  categories: ProjectCategory[];
  achievements?: string[];
}
