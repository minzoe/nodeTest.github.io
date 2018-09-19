const http = require('http');
const express = require('express');
const router = require('./router.js');
var querystring = require("querystring");
const ApiCallSearch = require("./api.js");
const ApiCallItem = require("./api.js");
var render = require("./render");
var commonHeader = {
  'Content-Type': 'html'
};

const port = 3000;

const app = express();
app.use(express.static(__dirname + '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('search', {
    });
  }).post('/', (req, res) => {
    req.on("data", function (postBody) {
      var query = querystring.parse(postBody.toString());
      res.writeHead(303, {
        "location": "/search?type=" + query.type + "&value=" + query.qVal
      });
      res.end();
    })
  }).get('/search', (req, res) => {
    var type = req.query.type;
    var value = req.query.value;
    var api = new ApiCallSearch(type, value)
    api.on('end', function (data) {
      res.render('profile', {
        results: data.results
      });
    });
  }).get('/item', (req, res) => {
    var index = req.query.index;
    var api = new ApiCallItem(index)
    api.on('end', function (data) {
      console.log(data)
      res.render('item', {
        results: data
      });
    });
  }).get('/test', (req, res) => {
    var drinks = [{
        name: 'Bloody Mary',
        drunkness: 3
      },
      {
        name: 'Martini',
        drunkness: 5
      },
      {
        name: 'Scotch',
        drunkness: 10
      }
    ];
    res.render('profile', {
      results: drinks,
      title: "This is a Test"
    });
  })

  .listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });