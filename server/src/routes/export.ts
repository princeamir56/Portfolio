import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { Profile } from '../models/Profile.js';
import { Project } from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const dataDir = path.join(process.cwd(), '..', 'public', 'data');

function ensureDir() {
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

export async function exportProfileJson() {
  ensureDir();
  const profile = await Profile.findOne().lean();
  if (profile) {
    const { _id, __v, createdAt, updatedAt, ...clean } = profile as any;
    fs.writeFileSync(path.join(dataDir, 'profile.json'), JSON.stringify(clean, null, 2));
  }
}

export async function exportProjectsJson() {
  ensureDir();
  const projects = await Project.find().sort({ date: -1 }).lean();
  const clean = projects.map(({ _id, __v, createdAt, updatedAt, ...rest }: any) => rest);
  fs.writeFileSync(path.join(dataDir, 'projects.json'), JSON.stringify(clean, null, 2));
}

router.post('/all', authMiddleware, async (_req, res) => {
  try {
    await exportProfileJson();
    await exportProjectsJson();
    res.json({ message: 'Exported profile.json and projects.json' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
