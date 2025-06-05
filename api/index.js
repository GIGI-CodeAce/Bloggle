import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import User from './models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import fs from 'fs'
import PostModel from './models/post.js'

import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = process.env.PORT || 4000
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const uploadMiddleware = multer({dest: 'uploads/'})

const app = express();
app.use(cors({credentials: true,origin: ['http://localhost:3000', 'https://bloggleapp.onrender.com']}));

app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+ '/uploads'))


mongoose.connect(process.env.MONGO_URI)
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

    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      JWT_SECRET,
      {}
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'none',
      secure: true, 
    }).json({ id: userDoc._id, username });

    console.log('✅ Registered and logged in:', username);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Username already exists' });
    }
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
        sameSite: 'none',
        secure: true,
      }).json({id:userDoc._id,
                username,
      });

  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

app.use((req, res, next) => {
  next();
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

app.post('/post', uploadMiddleware.single('file'), async(req, res) => {
  const { originalname, path: tempPath } = req.file;
  const ext = path.extname(originalname).toLowerCase();
  const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
  const newPath = path.join('uploads', newFileName);
  fs.renameSync(tempPath, newPath);

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    const { title, summary, content, tags } = req.body;
    let parsedTags = [];
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      console.warn('⚠️ Failed to parse tags:', tags);
    }

    const postDoc = await PostModel.create({
      title,
      summary,
      content,
      tags: parsedTags,
      cover: newPath.replace(/\\/g, '/'),
      author: info.id,
    });

    res.json(postDoc);
  });
});

app.put('/post', uploadMiddleware.single('file'), async (req,res)=>{
  let newPath = null
  if(req.file){
    const { originalname, path: tempPath } = req.file;
    const ext = path.extname(originalname).toLowerCase();
      const newFileName = Date.now() + '-' + Math.round(Math.random() * 1E9) + ext;
    newPath = path.join('uploads', newFileName);
    fs.renameSync(tempPath, newPath);
  }

  const {token} = req.cookies
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    const { id, title, summary, content, tags } = req.body;
    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid tags format' });
    }
    const postDoc = await PostModel.findById(id)

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) || info.username === 'admin'
    if(!isAuthor){
      return res.status(400).json('You are not the author..')
    }

    postDoc.set({
      title,
      summary,
      content,
       cover: newPath? newPath: postDoc.cover,
       tags: parsedTags
    })
    await postDoc.save()

    res.json(postDoc)
  });
})

app.delete('/delete/:id', (req, res) => {
  const { token } = req.cookies;
  const { id } = req.params;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    try {
      const postDoc = await PostModel.findById(id);
      if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
      }

      const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) || info.username === 'admin';
      if (!isAuthor) {
        return res.status(403).json({ error: 'You are not authorized to delete this post' });
      }

      await PostModel.findByIdAndDelete(id);

      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });
});


app.post('/post/:id/like', async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const userId = info.id;

    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      if (!post.likedBy) post.likedBy = [];

      const alreadyLiked = post.likedBy.some(id => id.toString() === userId);

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter(id => id.toString() !== userId);
      } else {
        post.likedBy.push(userId);
      }

      post.likes = post.likedBy.length;
      await post.save();

      res.json({ likes: post.likes, liked: !alreadyLiked });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to toggle like' });
    }
  });
});

app.get('/post/:id', async(req,res)=>{
  const {id} = req.params
  const postDoc =await PostModel.findById(id).populate('author', ['username'])
  res.json(postDoc)
})

app.get('/post', async(req, res)=>{
  res.json(await PostModel.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(22))
})



// Tusted sources news api


app.get('/news', async (req, res) => {
  const NEWS_API_KEYS = [
    process.env.NEWS_API_KEY1,
    process.env.NEWS_API_KEY2,
    process.env.NEWS_API_KEY3
  ].filter(Boolean); 
  console.log(process.env.NEWS_API_KEY1)
  console.log(process.env.NEWS_API_KEY2)
  console.log(process.env.NEWS_API_KEY3)
  

  if (NEWS_API_KEYS.length === 0) {
    return res.status(500).json({ error: 'No News API keys provided' })
  }

  const baseUrl = 'https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=22';

  let lastError = null;

  for (const apiKey of NEWS_API_KEYS) {
    const apiUrl = `${baseUrl}&apiKey=${apiKey}`
    console.log(apiUrl)
    
    try {
      const response = await fetch(apiUrl)
      const data = await response.json()

      console.log('🔍 Trying API key:', apiKey)
      console.log('🔍 NewsAPI response status:', response.status)
      console.log('🔍 NewsAPI response body:', data)

      if (response.status === 200 && data.status === 'ok') {
        return res.json(data)
      } else {
        lastError = {
          status: response.status,
          details: data,
        };
        continue
      }
    } catch (err) {
      console.error('❌ Error with API key:', apiKey, err);
      lastError = err
      continue
    }
  }

  res.status(500).json({
    error: 'All News API keys failed',
    details: lastError
  });
});





app.listen(PORT, () => {
  console.log(`🟩 Listening on port ${PORT}`);
});
