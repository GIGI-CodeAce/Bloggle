import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

router.post('/moderate', async (req, res) => {
  const { title, summary, content } = req.body;
  const text = `${title}\n${summary}\n${content}`;
  const MODERATION_API_KEY = process.env.MODERATION_API_KEY

  if (!MODERATION_API_KEY) {
    console.error('❌ Hugging Face API key not set in environment variables');
    return res.status(500).json({ message: 'Internal error: Missing AI moderation credentials.' });
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/unitary/toxic-bert', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${MODERATION_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    const result = await response.json();

    if (result.error) {
      console.error('🟥 Hugging Face error:', result.error);
      return res.status(500).json({
        message: 'Content moderation service failed.',
        error: result.error,
      });
    }

    if (!Array.isArray(result) || !result[0]) {
      console.warn('🟡 Unexpected model response:', result);
      return res.status(500).json({ message: 'Unexpected moderation response format.' });
    }

    const { label, score } = result[0];
    const threshold = 0.6;

    console.log(`🧪 Moderation result — Label: ${label}, Score: ${score}`);

    if (label === 'toxic' && score > threshold) {
      return res.status(400).json({ message: 'Post rejected due to toxic content.' });
    }

    return res.sendStatus(200);
  } catch (err) {
    console.error('❌ Moderation request failed:', err);
    return res.status(500).json({ message: 'Moderation service error. Please try again later.' });
  }
});

export default router;
