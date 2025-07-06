import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

// Counter variable (stored in memory)
let count = 0;

// Middleware
app.use(express.json());

/*
 * by adding this line, the server serves static files,
 * therefore index.html is typically served automatically
 *
 * Need to serve it manually, e.g. to do stuff when user loads index.html
 * then see the express_count_manual_index example
 *
 */
app.use(express.static('public'));

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
