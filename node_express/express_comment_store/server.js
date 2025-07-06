const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const DATA_FILE = './data.json';
let data = { count: 0, comments: [] };

if (fs.existsSync(DATA_FILE)) {
  data = JSON.parse(fs.readFileSync(DATA_FILE));
}

app.use(express.json());
app.use(express.static('public'));

app.get('/data', (req, res) => {
  console.log(data);
  res.json(data);
});

app.post('/comment', (req, res) => {
  const comment = req.body.comment;
  data.comments.push(comment);
  data.count += 1;

  // log the current data to the console
  console.log("data.comments: ", data.comments);

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
