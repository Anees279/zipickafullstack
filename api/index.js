const express = require('express');

const app = express();

// Middleware and routes
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, this is an Express.js app deployed on Vercel!');
});

app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

// Export the app directly for Vercel to handle
module.exports = app;
