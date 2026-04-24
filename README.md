# Amir Kerkeni Portfolio

Production-ready portfolio website built with React, Vite, TypeScript, Tailwind CSS, Framer Motion, and Lucide React.

## Tech Stack

- React + Vite
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Data-driven project rendering from `src/data/projects.ts`
- Ready for GitHub + Vercel deployment

## Project Structure

```text
.
|-- public/
|   |-- projects/              # project screenshots / previews
|   `-- videos/                # local MP4 demos
|-- src/
|   |-- components/            # reusable UI building blocks
|   |-- content/               # profile content and section data
|   |-- data/                  # dynamic projects dataset
|   |-- hooks/                 # reusable hooks such as theme state
|   |-- lib/                   # helpers / utilities
|   |-- types/                 # shared TypeScript types
|   |-- App.tsx
|   |-- index.css
|   `-- main.tsx
|-- index.html
`-- vite.config.ts
```

## Run Locally

```bash
npm install
npm run dev
```

## How To Add A New Project

Open `src/data/projects.ts` and add one new object to the `projects` array.

Required shape:

```ts
{
  slug: 'my-new-project',
  title: 'Project Name',
  summary: 'Short description shown on the card',
  description: 'Detailed professional description shown in the modal',
  technologies: ['React', 'FastAPI', 'TensorFlow'],
  github: 'https://github.com/...',
  demo: 'https://...',
  images: [
    { src: '/projects/example-1.svg', alt: 'Main preview' },
    { src: '/projects/example-2.svg', alt: 'Secondary preview' },
  ],
  video: 'https://youtube.com/... or /videos/demo.mp4',
  featured: true,
  date: '2026-03',
  categories: ['AI', 'Web'],
  achievements: ['Optional bullet point'],
}
```

That is the only code change required for rendering the project in the UI.

## How To Add Images And Videos

1. Add screenshots to `public/projects/`.
2. Add local videos to `public/videos/` if you are not using YouTube.
3. Reference those files in `src/data/projects.ts` using absolute public paths such as `/projects/my-shot.png` or `/videos/demo.mp4`.
4. Use multiple `images` entries to activate the built-in carousel automatically.
5. Add a `video` URL to activate the video modal automatically.

## Deploy To GitHub

1. Initialize git if needed:

```bash
git init
git add .
git commit -m "Initial portfolio"
```

2. Create a repository on GitHub.
3. Connect the remote:

```bash
git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main
```

## Deploy To Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Keep the default settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

## Notes

- Theme preference is saved in `localStorage`.
- SEO metadata lives in `index.html`.
- The contact form is static-friendly and can be upgraded to EmailJS or a backend endpoint later.
