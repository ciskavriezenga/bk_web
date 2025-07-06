import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
// count variable
let count = 0;

// Middleware
app.use(express.json());

/* To package javscript code to reuse, we can use ES Modules (ESM)
 * Refering tot he use of export and import
 * However, in ES modules, the dir name is not available,
 * which is required
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




/*
 * manually serving main page, to allow to do stuff
 * when user loads page
*/
app.get('/', (req, res) => {
  console.log("Manually serving index.html")
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

/*
 * by adding the line below this comment block, the server serves static files,
 * therefore index.html is typically served automatically
 * --> in this example we manually serve index.html
 */
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));



// OTHER ROUTES

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


// instead of express app.listen - we call listen on the http server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Initial count: ${count}`);
});
