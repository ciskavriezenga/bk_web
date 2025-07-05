const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Counter variable (stored in memory)
let count = 0;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
// GET route to serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET route to retrieve current count
app.get('/api/count', (req, res) => {
  console.log(`GET /api/count - Current count: ${count}`);
  res.json({ count });
});

// POST route to increment count
app.post('/api/increment', (req, res) => {
  count++;
  console.log(`POST /api/increment - Count incremented to: ${count}`);
  res.json({ count, message: 'Count incremented successfully' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Initial count: ${count}`);
});