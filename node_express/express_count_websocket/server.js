import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

/* ----- short explenation of the avove -------
 * including raw http server - to allow Socket.IO access
 * Socket.IO is added to enable real-time events between clients and server
 *
 * The difference with and without {} is that
 * {} are used to import a named export
 * without {}, for example with `import express from 'express';` can be used
 * when a module offers a default export
*/

const app = express();
// create HTTP server, wrapping the express app
const server = createServer(app);
// create socket io
const io = new SocketIO(server);


const PORT = 3000;
// count variable
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
  // emit update real-time
  io.emit('count-updated', count);
  res.json({ count, message: 'Count incremented successfully' });
});


// socket io connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('count-updated', count); // Send current count on connect
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// instead of express app.listen - we call listen on the http server
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Initial count: ${count}`);
});
