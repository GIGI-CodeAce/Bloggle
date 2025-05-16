import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import multer from 'multer';

import dotenv from 'dotenv';
dotenv.config();

const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const uploadMiddleware = multer({dest: 'uploads/'})

const app = express();
app.use(cors({credentials: true,origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())


mongoose.connect(process.env.VITE_MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const userDoc = await User.create({ username, password: hashedPassword });
    console.log('✅ Registered:', username);
    res.json(userDoc);
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ error: 'User registration failed' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.findOne({ username });
    if (!userDoc) {
      return res.status(400).json({ error: 'User not found' });
    }

    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (!passOk) {
      return res.status(400).json({ error: 'Wrong credentials' });
    }

      const token = jwt.sign(
        { id: userDoc._id, username: userDoc.username },
        JWT_SECRET,
        {}
      );

      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false,
      }).json({id:userDoc._id,
                username,
      });



  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, {}, (err, info) => {
    if (err) {
      console.error('❌ JWT verify error:', err);
      return res.status(403).json({ error: 'Token verification failed' });
    }

    res.json(info);
  });
});

app.post('/logout', (req,res)=>{
  res.cookie('token', '').json('ok')
})
app.post('/post', uploadMiddleware.single('file') ,(req, res) => {
  res.json({files:req.file})
});


app.listen(PORT, () => {
  console.log(`🟩 Listening on port ${PORT}`);
});
