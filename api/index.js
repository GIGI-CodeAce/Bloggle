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
import { useState } from 'react';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PORT = 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const uploadMiddleware = multer({dest: 'uploads/'})

const app = express();
app.use(cors({credentials: true,origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+ '/uploads'))


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

    const token = jwt.sign(
      { id: userDoc._id, username: userDoc.username },
      JWT_SECRET,
      {}
    );

    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, 
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

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)
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

app.post('/post/:id/like', async (req, res) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });

    const userId = info.id;

    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' });

      // Ensure likedBy array is initialized
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

app.listen(PORT, () => {
  console.log(`🟩 Listening on port ${PORT}`);
});
