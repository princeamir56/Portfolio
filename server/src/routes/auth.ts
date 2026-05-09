import { Router } from 'express';
import { User } from '../models/User.js';
import { generateToken, authMiddleware } from '../middleware/auth.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await (user as any).comparePassword(password))) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    res.json({ token: generateToken(user._id.toString()), email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById((req as any).userId).select('-password');
    res.json(user);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
