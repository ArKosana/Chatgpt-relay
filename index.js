const express = require('express');
const app = express();
const fetch = require('node-fetch');

app.use(express.json());

app.post('/', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).send('Missing message');
  }

  // Send to your Cloudflare Worker
  const cfResponse = await fetch('https://icy-dream-683f.kosana-ar.workers.dev/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const resultText = await cfResponse.text();
  res.status(200).send(`Forwarded to phone: ${resultText}`);
});

app.listen(3000, () => {
  console.log('Relay server live on port 3000');
});
