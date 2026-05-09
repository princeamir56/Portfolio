import { Router } from 'express';
import { Profile } from '../models/Profile.js';
import { authMiddleware } from '../middleware/auth.js';
import { exportProfileJson } from './export.js';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      res.status(404).json({ error: 'Profile not found' });
      return;
    }
    res.json(profile);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

router.put('/', authMiddleware, async (req, res) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true, runValidators: true }
    );
    await exportProfileJson().catch(() => {});
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
