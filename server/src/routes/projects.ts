import { Router } from 'express';
import { Project } from '../models/Project.js';
import { authMiddleware } from '../middleware/auth.js';
import { exportProjectsJson } from './export.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ date: -1 });
    res.json(projects);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    res.json(project);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const project = await Project.create(req.body);
    await exportProjectsJson().catch(() => {});
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    await exportProjectsJson().catch(() => {});
    res.json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      res.status(404).json({ error: 'Project not found' });
      return;
    }
    await exportProjectsJson().catch(() => {});
    res.json({ message: 'Project deleted' });
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
