const ApiCall = require("./api.js");
var render = require("./render");
var ejs = require("ejs");
var commonHeader = {
  'Content-Type': 'html'
};

function home(req, res) {
  res.writeHead(200, commonHeader);
  render.view("header", {}, res);
  render.view("navigation", {}, res);
  render.view("search", {}, res);
  render.view("footer", {}, res);
  res.end();
}

function spell(req, res) {
  var type = req.query.type;
  var value = req.query.value;
  var api = new ApiCall(type, value)
  api.on('end', function (data) {
    var results = data.results;
    return new Promise((res, rej) => {
      if (err) {
        rej(err);
      } else {
        res(results);
      }
    })
    // res.writeHead(200, commonHeader);
    // render.view("header", {}, res);
    // render.view("navigation", {}, res);
    // render.ejs("profile", values, res);
    // res.render('profile', {
    //   results: results
    // });
    // render.view("footer", {}, res);
    res.end();
  });

  //   studentProfile.on('error', function (err) {
  //     render.view("header", {}, res);
  //     render.view("error", { errorMessage: err.message }, res)
  //     render.view("search", {}, res);
  //     render.view("footer", {}, res);
  //     res.end();
  //   });
}

module.exports.home = home;
module.exports.spell = spell;