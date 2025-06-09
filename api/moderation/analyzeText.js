import fetch from 'node-fetch';

const API_KEY = 'YOUR_PERSPECTIVE_API_KEY'; // Replace with your actual key

export async function analyzeText(text) {
  const url = `https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=${API_KEY}`;

  const body = {
    comment: { text },
    languages: ['en'],
    requestedAttributes: {
      TOXICITY: {},
      INSULT: {},
      PROFANITY: {},
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  });

  const data = await res.json();
  return data;
}