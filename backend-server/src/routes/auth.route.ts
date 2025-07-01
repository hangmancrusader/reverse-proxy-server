// routes/auth.route.ts
import express from 'express';
import { login } from '../controllers/auth.controller';
import bcrypt from 'bcryptjs';
import User from '../models/User'; // Adjust the import path as necessary
const router = express.Router();

router.post('/login', login); // ✅ This is fine
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hash });
  await user.save();
  console.log('User created:', user.id);
  res.json({ message: 'User created' });
});

export default router;
