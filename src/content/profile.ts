import {
  BarChart3,
  Blocks,
  BrainCircuit,
  Code2,
  Database,
} from 'lucide-react';

export const navigationItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
] as const;

export const hero = {
  name: 'Amir Kerkeni',
  title: 'Software Developer | ML & AI Engineer | Data Analyst',
  location: 'Tunisia • Building for global teams',
  description:
    'I design and ship data-centric products that combine full-stack engineering, machine learning systems, and business intelligence thinking. My goal is to turn complex data into elegant, measurable software experiences.',
  metrics: [
    { value: '5+', label: 'portfolio-ready projects across AI, BI, data, and web engineering' },
    { value: '3rd', label: 'place at a hackathon with an AI pharmacy HR solution' },
    { value: '1', label: 'engineering path focused on Business Intelligence and scalable systems' },
    { value: '100%', label: 'data-driven approach to product decisions and implementation' },
  ],
  focusAreas: [
    {
      title: 'Applied AI products',
      description:
        'Designing intelligent applications that connect machine learning models with interfaces people can actually use.',
    },
    {
      title: 'Business intelligence systems',
      description:
        'Modeling pipelines, warehouses, and dashboards that support faster and more confident decision-making.',
    },
    {
      title: 'Scalable software delivery',
      description:
        'Building maintainable full-stack products with clean architecture, reusable components, and production-minded workflows.',
    },
  ],
  socials: [
    { label: 'GitHub', href: 'https://github.com/amirk', external: true },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/amir-kerkeni-274263350/', external: true },
    { label: 'Email', href: 'mailto:amirkerkeni56@gmail.com', external: false },
  ],
};

export const about = {
  summary:
    'I’m an engineering student in Business Intelligence with a software mindset: I enjoy structuring systems, simplifying complexity, and using data to drive better product outcomes.',
  story:
    'My work sits at the convergence of software development, machine learning, and analytics. I like building things end to end: exploring raw data, designing the architecture, training or integrating intelligent models, and delivering interfaces that feel sharp, fast, and reliable. Whether I am building an AI-powered workflow, an MLOps pipeline, or a BI reporting solution, I care deeply about maintainability, clarity, and business value.',
  highlights: [
    {
      title: 'Product-oriented builder',
      description:
        'I focus on solutions that are both technically solid and genuinely useful for real teams, users, and decision-makers.',
    },
    {
      title: 'Data-to-interface mindset',
      description:
        'I’m comfortable moving from SQL and analytics to APIs, frontend experiences, and deployment-ready architecture.',
    },
    {
      title: 'Continuous learner',
      description:
        'I actively explore MLOps, applied AI, warehousing, and modern web engineering to keep my work current and adaptable.',
    },
  ],
};

export const skills = [
  {
    title: 'AI / ML',
    icon: BrainCircuit,
    items: ['TensorFlow', 'scikit-learn', 'PyTorch basics', 'MLOps', 'Model evaluation', 'Prompt workflows'],
  },
  {
    title: 'Data / BI',
    icon: Database,
    items: ['SQL', 'Power BI', 'ETL', 'Data Warehousing', 'Star Schema', 'Data Visualization'],
  },
  {
    title: 'Programming',
    icon: Code2,
    items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'Java', 'Dart'],
  },
  {
    title: 'Frameworks',
    icon: Blocks,
    items: ['React', 'Vite', 'FastAPI', 'Flutter', 'Tailwind CSS', 'REST APIs'],
  },
  {
    title: 'DevOps',
    icon: BarChart3,
    items: ['GitHub', 'Vercel', 'Docker basics', 'CI/CD concepts', 'SQL Server', 'Version Control'],
  },
] as const;

export const experience = [
  {
    role: 'Software Engineering Intern',
    company: 'Sagemcom',
    location: 'Tunisia',
    period: '2025',
    stack: ['Flutter', 'C#', 'SQL Server', 'REST APIs'],
    highlights: [
      'Contributed to internal product development using Flutter for interface work and C# for backend logic.',
      'Worked with SQL Server to support data persistence, querying, and application-side integrations.',
      'Collaborated around API-driven workflows and practical enterprise engineering constraints.',
    ],
  },
];

export const education = [
  {
    degree: 'Engineering Degree in Business Intelligence',
    school: 'Business Intelligence Engineering Program',
    period: 'Current',
    description:
      'Focused on analytics engineering, AI foundations, data warehousing, decision systems, and scalable software problem-solving.',
  },
  {
    degree: 'Bachelor in Computer Science',
    school: 'Computer Science Program',
    period: 'Completed',
    description:
      'Built strong fundamentals in software development, algorithms, databases, systems thinking, and practical implementation.',
  },
];

export const certifications = [
  { name: 'Machine Learning Specialization', issuer: 'Coursera / DeepLearning.AI', year: '2025' },
  { name: 'Data Analysis with SQL', issuer: 'Coursera', year: '2025' },
  { name: 'Power BI for Business Intelligence', issuer: 'Udemy', year: '2024' },
];

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'French', level: 'Professional' },
  { name: 'English', level: 'Professional' },
];

export const contact = {
  email: 'amir.kerkeni.dev@gmail.com',
  summary:
    'I’m available for internships, freelance collaboration, technical partnerships, and ambitious product discussions around AI, analytics, and software engineering.',
  methods: [
    {
      label: 'Email',
      value: 'amir.kerkeni.dev@gmail.com',
      href: 'mailto:amir.kerkeni.dev@gmail.com',
      external: false,
    },
    {
      label: 'LinkedIn',
      value: 'linkedin.com/in/amirkerkeni',
      href: 'https://linkedin.com/in/amirkerkeni',
      external: true,
    },
    {
      label: 'GitHub',
      value: 'github.com/amirk',
      href: 'https://github.com/amirk',
      external: true,
    },
    {
      label: 'Location',
      value: 'Tunisia',
      href: '#hero',
      external: false,
    },
  ],
};
