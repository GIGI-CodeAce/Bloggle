import jwt from 'jsonwebtoken'
import PostModel from './models/post.js'
import path from 'path';
import fs from 'fs'

const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret'


export async function PostPost(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' })
  }

  const { path: tempPath, mimetype } = req.file
  const fileBuffer = fs.readFileSync(tempPath)

  // Delete temp file
  fs.unlinkSync(tempPath)

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });

    const { title, summary, content, tags } = req.body;

    let parsedTags = [];
    try {
      parsedTags = JSON.parse(tags)
    } catch (e) {
      console.warn('⚠️ Failed to parse tags:', tags)
    }

    try {
      const postDoc = await PostModel.create({
        title,
        summary,
        content,
        tags: parsedTags,
        cover: fileBuffer,
        coverType: mimetype,
        author: info.id,
      });

      res.json(postDoc);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error creating post.' });
    }
  });
}



export async function PutPost(req, res) {
  let coverBuffer = null;
  let coverType = null;

  if (req.file) {
    const { path: tempPath, mimetype } = req.file;
    coverBuffer = fs.readFileSync(tempPath);
    coverType = mimetype;
    fs.unlinkSync(tempPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ error: 'Invalid token' })

    const { id, title, summary, content, tags } = req.body;

    let parsedTags;
    try {
      parsedTags = JSON.parse(tags);
    } catch (e) {
      return res.status(400).json({ error: 'Invalid tags format' })
    }

    const postDoc = await PostModel.findById(id);
    if (!postDoc) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) || info.username === 'admin'
    if (!isAuthor) {
      return res.status(400).json('You are not the author.')
    }

    postDoc.set({
      title,
      summary,
      content,
      tags: parsedTags,
      ...(coverBuffer && { cover: coverBuffer, coverType }),
    });

    await postDoc.save()

    res.json(postDoc)
  });
}


export async function PostLikeId(req,res){
      const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: 'Unauthorized - No token' })

  jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
    if (err) return res.status(403).json({ message: 'Invalid token' })

    const userId = info.id;

    try {
      const post = await PostModel.findById(req.params.id);
      if (!post) return res.status(404).json({ message: 'Post not found' })

      if (!post.likedBy) post.likedBy = []

      const alreadyLiked = post.likedBy.some(id => id.toString() === userId)

      if (alreadyLiked) {
        post.likedBy = post.likedBy.filter(id => id.toString() !== userId)
      } else {
        post.likedBy.push(userId)
      }

      post.likes = post.likedBy.length
      await post.save()

      res.json({ likes: post.likes, liked: !alreadyLiked })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Failed to toggle like' })
    }
  });
}

export async function DeletePostById(req,res){
      const { token } = req.cookies
      const { id } = req.params
    
      if (!token) {
        return res.status(401).json({ error: 'No token provided' })
      }
    
      jwt.verify(token, JWT_SECRET, {}, async (err, info) => {
        if (err) return res.status(403).json({ error: 'Invalid token' })
    
        try {
          const postDoc = await PostModel.findById(id)
          if (!postDoc) {
            return res.status(404).json({ error: 'Post not found' })
          }
    
          const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id) || info.username === 'admin'
          if (!isAuthor) {
            return res.status(403).json({ error: 'You are not authorized to delete this post' })
          }
    
          await PostModel.findByIdAndDelete(id)
    
          res.json({ message: 'A post deleted' })
        } catch (error) {
          console.error('Delete post error:', error)
          res.status(500).json({ error: 'Failed to delete post' })
        }
      });
}

export async function GetPostId(req, res) {
  const { id } = req.params;
  const postDoc = await PostModel.findById(id).populate('author', ['username'])

  if (!postDoc) {
    return res.status(404).json({ error: 'Post not found' })
  }

  const base64Image = postDoc.cover
    ? `data:${postDoc.coverType};base64,${postDoc.cover.toString('base64')}`
    : null;

  res.json({
    ...postDoc.toObject(),
    cover: base64Image,
  });
}

