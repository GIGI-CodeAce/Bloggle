import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js'; // Make sure to include .js extension

const PORT = 4000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('key')
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({ username, password });
    console.log('✅ Received:', username, password);
    res.json(userDoc);
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'User registration failed' });
  }
});

app.listen(PORT, () => console.log(`🟩 Listening on port ${PORT}`));
