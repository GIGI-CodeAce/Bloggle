import bcrypt from 'bcryptjs';
import User from './models/user.js'
import jwt from 'jsonwebtoken'

export async function LoginPost(req,res){
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
}


const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';

export async function RegisterPost(req,res){
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
}