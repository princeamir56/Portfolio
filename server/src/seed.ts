import 'dotenv/config';
import { connectDB } from './config/db.js';
import { User } from './models/User.js';
import { Profile } from './models/Profile.js';
import { Project } from './models/Project.js';

const profileData = {
  hero: {
    name: 'Amir Kerkeni',
    title: 'Software Developer | ML & AI Engineer | Data Analyst',
    location: 'Tunisia • Building for global teams',
    description: 'I design and ship data-centric products that combine full-stack engineering, machine learning systems, and business intelligence thinking. My goal is to turn complex data into elegant, measurable software experiences.',
    metrics: [
      { value: '5+', label: 'portfolio-ready projects across AI, BI, data, and web engineering' },
      { value: '3rd', label: 'place at a hackathon with an AI pharmacy HR solution' },
      { value: '1', label: 'engineering path focused on Business Intelligence and scalable systems' },
      { value: '100%', label: 'data-driven approach to product decisions and implementation' },
    ],
    focusAreas: [
      { title: 'Applied AI products', description: 'Designing intelligent applications that connect machine learning models with interfaces people can actually use.' },
      { title: 'Business intelligence systems', description: 'Modeling pipelines, warehouses, and dashboards that support faster and more confident decision-making.' },
      { title: 'Scalable software delivery', description: 'Building maintainable full-stack products with clean architecture, reusable components, and production-minded workflows.' },
    ],
    socials: [
      { label: 'GitHub', href: 'https://github.com/amirk', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/amir-kerkeni-274263350/', external: true },
      { label: 'Email', href: 'mailto:amirkerkeni56@gmail.com', external: false },
    ],
  },
  about: {
    summary: 'I’m an engineering student in Business Intelligence with a software mindset: I enjoy structuring systems, simplifying complexity, and using data to drive better product outcomes.',
    story: 'My work sits at the convergence of software development, machine learning, and analytics. I like building things end to end: exploring raw data, designing the architecture, training or integrating intelligent models, and delivering interfaces that feel sharp, fast, and reliable. Whether I am building an AI-powered workflow, an MLOps pipeline, or a BI reporting solution, I care deeply about maintainability, clarity, and business value.',
    highlights: [
      { title: 'Product-oriented builder', description: 'I focus on solutions that are both technically solid and genuinely useful for real teams, users, and decision-makers.' },
      { title: 'Data-to-interface mindset', description: 'I’m comfortable moving from SQL and analytics to APIs, frontend experiences, and deployment-ready architecture.' },
      { title: 'Continuous learner', description: 'I actively explore MLOps, applied AI, warehousing, and modern web engineering to keep my work current and adaptable.' },
    ],
  },
  skills: [
    { title: 'AI / ML', icon: 'BrainCircuit', items: ['TensorFlow', 'scikit-learn', 'PyTorch basics', 'MLOps', 'Model evaluation', 'Prompt workflows'] },
    { title: 'Data / BI', icon: 'Database', items: ['SQL', 'Power BI', 'ETL', 'Data Warehousing', 'Star Schema', 'Data Visualization'] },
    { title: 'Programming', icon: 'Code2', items: ['Python', 'TypeScript', 'JavaScript', 'C#', 'Java', 'Dart'] },
    { title: 'Frameworks', icon: 'Blocks', items: ['React', 'Vite', 'FastAPI', 'Flutter', 'Tailwind CSS', 'REST APIs'] },
    { title: 'DevOps', icon: 'BarChart3', items: ['GitHub', 'Vercel', 'Docker basics', 'CI/CD concepts', 'SQL Server', 'Version Control'] },
  ],
  experience: [
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
  ],
  education: [
    { degree: 'Engineering Degree in Business Intelligence', school: 'Business Intelligence Engineering Program', period: 'Current', description: 'Focused on analytics engineering, AI foundations, data warehousing, decision systems, and scalable software problem-solving.' },
    { degree: 'Bachelor in Computer Science', school: 'Computer Science Program', period: 'Completed', description: 'Built strong fundamentals in software development, algorithms, databases, systems thinking, and practical implementation.' },
  ],
  certifications: [
    { name: 'Machine Learning Specialization', issuer: 'Coursera / DeepLearning.AI', year: '2025', credentialUrl: '', image: '' },
    { name: 'Data Analysis with SQL', issuer: 'Coursera', year: '2025', credentialUrl: '', image: '' },
    { name: 'Power BI for Business Intelligence', issuer: 'Udemy', year: '2024', credentialUrl: '', image: '' },
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'French', level: 'Professional' },
    { name: 'English', level: 'Professional' },
  ],
  contact: {
    email: 'amir.kerkeni.dev@gmail.com',
    summary: 'I’m available for internships, freelance collaboration, technical partnerships, and ambitious product discussions around AI, analytics, and software engineering.',
    methods: [
      { label: 'Email', value: 'amir.kerkeni.dev@gmail.com', href: 'mailto:amir.kerkeni.dev@gmail.com', external: false },
      { label: 'LinkedIn', value: 'linkedin.com/in/amirkerkeni', href: 'https://linkedin.com/in/amirkerkeni', external: true },
      { label: 'GitHub', value: 'github.com/amirk', href: 'https://github.com/amirk', external: true },
      { label: 'Location', value: 'Tunisia', href: '#hero', external: false },
    ],
  },
  cvUrl: '',
};

const projectsData = [
  {
    slug: 'ai-pharmacy-hr-system',
    title: 'AI Pharmacy HR System',
    summary: 'Hackathon-winning HR workflow platform for pharmacies, combining AI assistance, staffing visibility, and smart operational insights.',
    description: 'An AI-powered human resources system designed for pharmacy teams during a hackathon where the project earned 3rd place. The platform centralizes staff management, streamlines HR workflows, and introduces intelligent assistance for decision support.',
    technologies: ['React', 'FastAPI', 'Python', 'SQL', 'OpenAI API'],
    github: 'https://github.com/amirk/ai-pharmacy-hr-system',
    demo: 'https://ai-pharmacy-hr-system.vercel.app',
    images: [
      { src: '/projects/ai-pharmacy-dashboard.svg', alt: 'Dashboard view of the AI Pharmacy HR System' },
      { src: '/projects/ai-pharmacy-analytics.svg', alt: 'Analytics panel for staffing and performance insights' },
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
    date: '2026-03',
    categories: ['AI', 'Web'],
    achievements: ['Won 3rd place in a hackathon setting.', 'Designed for a real pharmacy operations use case.', 'Combined AI, HR management, and user experience under deadline pressure.'],
  },
  {
    slug: 'mlops-pipeline-cifar10',
    title: 'MLOps Pipeline (CIFAR-10)',
    summary: 'Production-style machine learning workflow for image classification, with automation, reproducibility, and experiment tracking.',
    description: 'This project focuses on operationalizing a CIFAR-10 image classification model with an MLOps mindset. It covers dataset handling, model training, validation, experiment comparison, and deployment-oriented structuring.',
    technologies: ['Python', 'TensorFlow', 'Docker', 'MLflow', 'GitHub Actions'],
    github: 'https://github.com/amirk/mlops-pipeline-cifar10',
    demo: 'https://mlops-cifar10-demo.vercel.app',
    images: [
      { src: '/projects/mlops-overview.svg', alt: 'Overview of the MLOps pipeline architecture' },
      { src: '/projects/mlops-training.svg', alt: 'Training and experiment tracking interface' },
    ],
    video: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    featured: true,
    date: '2026-02',
    categories: ['ML', 'AI', 'Data'],
    achievements: ['Structured model training for repeatability.', 'Documented the lifecycle from experimentation to delivery.', 'Focused on engineering discipline in ML development.'],
  },
  {
    slug: 'data-warehouse-bi-project',
    title: 'Data Warehouse & BI Project',
    summary: 'Decision-support platform combining ETL, dimensional modeling, and executive dashboards for business intelligence analysis.',
    description: 'A business intelligence project built around a warehouse-first approach with ETL design, dimensional modeling, and dashboard-ready reporting.',
    technologies: ['SQL', 'Power BI', 'ETL', 'SSIS', 'Data Warehouse'],
    github: 'https://github.com/amirk/data-warehouse-bi-project',
    demo: 'https://bi-warehouse-portfolio.vercel.app',
    images: [
      { src: '/projects/warehouse-model.svg', alt: 'Data warehouse dimensional model diagram' },
      { src: '/projects/warehouse-dashboard.svg', alt: 'Business intelligence dashboard' },
    ],
    featured: true,
    date: '2026-01',
    categories: ['Data'],
    achievements: ['Modeled facts and dimensions for analytics-ready reporting.', 'Connected ETL logic with clean executive-facing dashboard design.'],
  },
  {
    slug: 'house-price-prediction-app',
    title: 'House Price Prediction App',
    summary: 'Interactive web application that predicts housing prices through a machine learning model and a clean user-friendly interface.',
    description: 'A predictive web app that packages a machine learning model into a simple product experience.',
    technologies: ['React', 'FastAPI', 'scikit-learn', 'Python', 'Pandas'],
    github: 'https://github.com/princeamir56/AiProject',
    demo: '',
    images: [
      { src: '/projects/house-price-form.svg', alt: 'House price prediction form interface' },
      { src: '/projects/house-price-results.svg', alt: 'Prediction results view' },
    ],
    featured: true,
    date: '2025-11',
    categories: ['ML', 'Web'],
    achievements: ['Connected a trained model to a deployable frontend experience.', 'Improved interpretability through contextual result presentation.'],
  },
  {
    slug: 'covid19-sql-analysis',
    title: 'COVID-19 SQL Analysis',
    summary: 'Exploratory and analytical SQL project studying pandemic trends through structured queries.',
    description: 'A data analysis project built around SQL exploration of COVID-19 datasets.',
    technologies: ['SQL', 'PostgreSQL', 'Excel', 'Data Visualization'],
    github: 'https://github.com/amirk/covid19-sql-analysis',
    demo: 'https://covid-sql-analysis.vercel.app',
    images: [
      { src: '/projects/covid-sql-map.svg', alt: 'Global analysis map' },
      { src: '/projects/covid-sql-kpis.svg', alt: 'KPI and query result dashboard' },
    ],
    featured: false,
    date: '2025-08',
    categories: ['Data'],
    achievements: ['Explored time-based patterns and regional comparisons.', 'Translated raw query output into clear decision-oriented visuals.'],
  },
];

async function seed() {
  await connectDB();
  console.log('Seeding database...');

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@portfolio.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  const existingUser = await User.findOne({ email: adminEmail });
  if (!existingUser) {
    await User.create({ email: adminEmail, password: adminPassword });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists');
  }

  await Profile.deleteMany({});
  await Profile.create(profileData);
  console.log('Profile seeded');

  await Project.deleteMany({});
  await Project.insertMany(projectsData);
  console.log(`${projectsData.length} projects seeded`);

  console.log('Seed complete!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
