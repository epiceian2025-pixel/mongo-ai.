import 'dotenv/config';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    if (!message) return res.status(400).json({ error: 'Please enter a message.' });
    if (message.length > 8000) return res.status(413).json({ error: 'Message is too long.' });

    const apiKey = process.env.AI_API_KEY;
    const baseUrl = (process.env.AI_BASE_URL || 'https://api.openai.com/v1').replace(/\/+$/, '');
    const model = process.env.AI_MODEL || 'gpt-4.1-mini';
    if (!apiKey) return res.status(503).json({ error: 'The server owner has not configured the AI API key yet.' });

    const upstream = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: 'You are Mongo AI, a helpful, friendly assistant. Be clear and honest.' },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });

    const payload = await upstream.json().catch(() => ({}));
    if (!upstream.ok) {
      const detail = payload?.error?.message || `AI provider returned HTTP ${upstream.status}.`;
      return res.status(502).json({ error: detail });
    }
    const reply = payload?.choices?.[0]?.message?.content;
    if (typeof reply !== 'string' || !reply.trim()) {
      return res.status(502).json({ error: 'The AI provider returned an empty response.' });
    }
    res.json({ reply: reply.trim() });
  } catch (error) {
    console.error('Chat request failed:', error);
    res.status(500).json({ error: 'Unexpected server error.' });
  }
});

app.listen(port, () => {
  console.log(`Mongo AI is running at http://localhost:${port}`);
});
