var fs = require("fs");

function mergeValues(values, content) {
  for (var key in values) {
    content = content.replace("{{" + key + "}}", values[key])
  }
  return content;
}

function html(templateName, values, res) {
  var fileContent = fs.readFileSync('./views/partials/' + templateName + '.html', 'utf8');
  fileContent = mergeValues(values, fileContent);
  res.write(fileContent);
}

function ejs(templateName, values, res) {
  var fileContent = fs.readFileSync('./views/partials/' + templateName + '.ejs', 'utf8');
  fileContent = mergeValues(values, fileContent);
  res.write(fileContent);
}

module.exports.view = html;
module.exports.ejs = ejs;