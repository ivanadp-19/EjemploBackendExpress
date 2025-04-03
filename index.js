const express = require('express');
const cors = require('cors');
const students = require('./mockData');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// GET students endpoint
app.get('/students', (req, res) => {
  res.json(students);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
