const http = require('http');
const formidable = require('formidable');
const util = require('util');

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')

  if (req.method.toLowerCase() === 'post') {
    processform(req, res);
    return;
  }

  res.end();
});

function processform(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {
    res.writeHead(200, {
      'content-type': 'application/json'
    });

    var data = JSON.stringify({
      fields: fields
    });

    res.end(data);

    console.log('posted fields:\n');
    console.log(data);
  });
}

var port = 3100;
server.listen(port);
console.log("server listening on port " + port);