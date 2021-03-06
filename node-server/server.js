const http = require('http');
const formidable = require('formidable');
const util = require('util');

const server = http.createServer(function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.writeHead(200, {
    'content-type': 'application/json'
  });

  if (req.method.toLowerCase() === 'post') {
    processform(req, res);
    return;
  }

  if (req.method.toLowerCase() === 'get') {
    var data = {
      data: {
        languages: [
          'English',
          'Spanish',
          'German',
          'Other',
        ]
      }
    };

    const responseData = JSON.stringify(data);
    res.end(responseData);
    console.log("get: ", responseData);
    return;
  }

  res.end();
});

function processform(req, res) {
  var form = new formidable.IncomingForm();

  form.parse(req, function(err, fields) {

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