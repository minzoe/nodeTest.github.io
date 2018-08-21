const http = require('http');
const express = require('express');
const router = require('./router.js');

const port = 3000;

const app = express();
app.use(express.static(__dirname + '/views'));

app.get('/', (req, res) => {
  router.home(req, res);
  router.user(req, res);
}).listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});