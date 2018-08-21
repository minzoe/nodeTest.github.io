const http = require('http');
const express = require('express');
const router = require('./router.js');
var querystring = require("querystring");

const port = 3000;

const app = express();
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  router.home(req, res);
}).post('/', (req, res) => {
  req.on("data", function (postBody) {
    var query = querystring.parse(postBody.toString());
    res.writeHead(303, {
      "location": "/search?type=" + query.type + "&value=" + query.qVal
    });
    res.end();
  })
}).get('/search', (req, res) => {
  router.spell(req, res);
})

.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});