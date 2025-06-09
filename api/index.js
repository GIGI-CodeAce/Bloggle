import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import multer from 'multer'
import PostModel from './models/post.js'
import moderationRoutes from './moderation/moderation.js'
import { LoginPost,RegisterPost } from './accountRegisterAssets.js'
import { PostPost,PutPost,GetPostId,PostLikeId,DeletePostById } from './createPostAssetes.js'

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

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);

    const allowedOrigins = ['http://localhost:3000', 'https://bloggleapp.onrender.com'];
    if (allowedOrigins.indexOf(origin) === -1) {
      return callback(new Error('Not allowed by CORS'), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));


app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname+ '/uploads'))
app.use('/api', moderationRoutes)


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err))

app.post('/register', async (req, res) => RegisterPost(req,res))
app.post('/login', async (req, res) => LoginPost(req,res))
app.post('/logout', (req,res)=>{res.cookie('token', '').json('ok')})

app.post('/post', uploadMiddleware.single('file'), async (req, res) => PostPost(req,res));
app.put('/post', uploadMiddleware.single('file'), async (req,res)=> PutPost(req,res))
app.get('/post/:id', async(req,res)=> GetPostId(req,res))
app.delete('/delete/:id', (req, res) => DeletePostById(req,res))

app.post('/post/:id/like', async (req, res) => PostLikeId(req,res))


app.use((req, res, next) => {next()})

app.get('/profile', (req, res) => {
  const {token} = req.cookies

  if (!token) {
    return res.status(401).json({ error: 'No token provided' })
  }

  jwt.verify(token, JWT_SECRET, {}, (err, info) => {
    if (err) {
      console.error('❌ JWT verify error:', err)
      return res.status(403).json({ error: 'Token verification failed' })
    }

    res.json(info);
  })
})

app.get('/post', async(req, res)=>{
  res.json(await PostModel.find()
  .populate('author', ['username'])
  .sort({createdAt: -1})
  .limit(22))
})

let cachedNews = null;
let cacheTimestamp = 0;
const CACHE_DURATION_MS = 1000 * 60 * 10;


// News backend

app.get('/news', async (req, res) => {
  const now = Date.now()
  const GUARDIAN_API_KEY = process.env.NEWS_API_KEY
  const GUARDIAN_BASE_URL = `https://content.guardianapis.com/search?section=technology&show-fields=all&page-size=22&api-key=${GUARDIAN_API_KEY}`

  if (!GUARDIAN_API_KEY) {
    return res.status(500).json({ error: 'No Guardian API key provided' });
  }

  if (cachedNews && now - cacheTimestamp < CACHE_DURATION_MS) {
    console.log('🟢 Returning cached Guardian news data');
    return res.json(cachedNews);
  }

  try {
    const response = await fetch(GUARDIAN_BASE_URL);
    const contentType = response.headers.get('content-type');

    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      return res.status(500).json({ error: 'Expected JSON but got non-JSON', raw: text.slice(0, 300) });
    }

    const data = await response.json();

    if (response.status === 200 && data.response?.status === "ok") {
      cachedNews = data;
      cacheTimestamp = now;
      return res.json(data);
    } else {
      return res.status(500).json({ error: 'Failed to fetch news from The Guardian', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Fetch error', message: err.message });
  }
});


app.listen(PORT, () => {
  console.log(`🟩 Listening on port ${PORT}`)
});
