import type { Project } from '../types/project';

export const projects: Project[] = [
  {
    slug: 'ai-pharmacy-hr-system',
    title: 'AI Pharmacy HR System',
    summary:
      'Hackathon-winning HR workflow platform for pharmacies, combining AI assistance, staffing visibility, and smart operational insights.',
    description:
      'An AI-powered human resources system designed for pharmacy teams during a hackathon where the project earned 3rd place. The platform centralizes staff management, streamlines HR workflows, and introduces intelligent assistance for decision support. It was designed to balance usability, business relevance, and innovation under tight delivery constraints.',
    technologies: ['React', 'FastAPI', 'Python', 'SQL', 'OpenAI API'],
    github: 'https://github.com/amirk/ai-pharmacy-hr-system',
    demo: 'https://ai-pharmacy-hr-system.vercel.app',
    images: [
      {
        src: '/projects/ai-pharmacy-dashboard.svg',
        alt: 'Dashboard view of the AI Pharmacy HR System',
      },
      {
        src: '/projects/ai-pharmacy-analytics.svg',
        alt: 'Analytics panel for staffing and performance insights',
      },
    ],
    video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    featured: true,
    date: '2026-03',
    categories: ['AI', 'Web'],
    achievements: [
      'Won 3rd place in a hackathon setting.',
      'Designed for a real pharmacy operations use case.',
      'Combined AI, HR management, and user experience under deadline pressure.',
    ],
  },
  {
    slug: 'mlops-pipeline-cifar10',
    title: 'MLOps Pipeline (CIFAR-10)',
    summary:
      'Production-style machine learning workflow for image classification, with automation, reproducibility, and experiment tracking.',
    description:
      'This project focuses on operationalizing a CIFAR-10 image classification model with an MLOps mindset. It covers dataset handling, model training, validation, experiment comparison, and deployment-oriented structuring. The emphasis is not only on model performance, but also on reproducibility, traceability, and sustainable iteration.',
    technologies: ['Python', 'TensorFlow', 'Docker', 'MLflow', 'GitHub Actions'],
    github: 'https://github.com/amirk/mlops-pipeline-cifar10',
    demo: 'https://mlops-cifar10-demo.vercel.app',
    images: [
      {
        src: '/projects/mlops-overview.svg',
        alt: 'Overview of the MLOps pipeline architecture for CIFAR-10',
      },
      {
        src: '/projects/mlops-training.svg',
        alt: 'Training and experiment tracking interface',
      },
    ],
    video: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',
    featured: true,
    date: '2026-02',
    categories: ['ML', 'AI', 'Data'],
    achievements: [
      'Structured model training for repeatability and maintainability.',
      'Documented the lifecycle from experimentation to delivery.',
      'Focused on engineering discipline in machine learning development.',
    ],
  },
  {
    slug: 'data-warehouse-bi-project',
    title: 'Data Warehouse & BI Project',
    summary:
      'Decision-support platform combining ETL, dimensional modeling, and executive dashboards for business intelligence analysis.',
    description:
      'A business intelligence project built around a warehouse-first approach. It includes ETL design, dimensional modeling, and dashboard-ready reporting to help stakeholders understand operational and strategic performance. The project demonstrates a strong BI workflow from source preparation through final insight delivery.',
    technologies: ['SQL', 'Power BI', 'ETL', 'SSIS', 'Data Warehouse'],
    github: 'https://github.com/amirk/data-warehouse-bi-project',
    demo: 'https://bi-warehouse-portfolio.vercel.app',
    images: [
      {
        src: '/projects/warehouse-model.svg',
        alt: 'Data warehouse dimensional model diagram',
      },
      {
        src: '/projects/warehouse-dashboard.svg',
        alt: 'Business intelligence dashboard with KPI cards and charts',
      },
    ],
    featured: true,
    date: '2026-01',
    categories: ['Data'],
    achievements: [
      'Modeled facts and dimensions for analytics-ready reporting.',
      'Connected ETL logic with clean executive-facing dashboard design.',
      'Demonstrated business intelligence thinking beyond isolated analysis.',
    ],
  },
  {
    slug: 'house-price-prediction-app',
    title: 'House Price Prediction App',
    summary:
      'Interactive web application that predicts housing prices through a machine learning model and a clean user-friendly interface.',
    description:
      'A predictive web app that packages a machine learning model into a simple product experience. Users can input property features, receive a prediction, and understand which variables matter most. The project shows how to move from modeling to a usable interface that feels practical and accessible.',
    technologies: ['React', 'FastAPI', 'scikit-learn', 'Python', 'Pandas'],
    github: 'https://github.com/princeamir56/AiProject',
    demo: 'https://www.linkedin.com/posts/amir-kerkeni-274263350_ai-machinelearning-fullstack-activity-7429566442087518208--IVJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFeaU7gBq4K80oZt0itEEf9wIn3RMvp0wFw',
    images: [
      {
        src: '/projects/house-price-form.svg',
        alt: 'House price prediction form interface',
      },
      {
        src: '/projects/house-price-results.svg',
        alt: 'Prediction results view with pricing insights',
      },
    ],
    video: 'https://www.linkedin.com/posts/amir-kerkeni-274263350_ai-machinelearning-fullstack-activity-7429566442087518208--IVJ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFeaU7gBq4K80oZt0itEEf9wIn3RMvp0wFw',
    featured: true,
    date: '2025-11',
    categories: ['ML', 'Web'],
    achievements: [
      'Connected a trained model to a deployable frontend experience.',
      'Improved interpretability through contextual result presentation.',
    ],
  },
  {
    slug: 'covid19-sql-analysis',
    title: 'COVID-19 SQL Analysis',
    summary:
      'Exploratory and analytical SQL project studying pandemic trends through structured queries, aggregates, and comparative metrics.',
    description:
      'A data analysis project built around SQL exploration of COVID-19 datasets. It investigates infection rates, deaths, recovery trends, and cross-country comparisons while demonstrating clean querying, aggregation, and insight extraction. The work highlights strong SQL fluency and analytical storytelling.',
    technologies: ['SQL', 'PostgreSQL', 'Excel', 'Data Visualization'],
    github: 'https://github.com/amirk/covid19-sql-analysis',
    demo: 'https://covid-sql-analysis.vercel.app',
    images: [
      {
        src: '/projects/covid-sql-map.svg',
        alt: 'Global analysis map for COVID-19 SQL study',
      },
      {
        src: '/projects/covid-sql-kpis.svg',
        alt: 'KPI and query result dashboard for COVID-19 analysis',
      },
    ],
    featured: false,
    date: '2025-08',
    categories: ['Data'],
    achievements: [
      'Explored time-based patterns and regional comparisons through SQL.',
      'Translated raw query output into clear decision-oriented visuals.',
    ],
  },
];
