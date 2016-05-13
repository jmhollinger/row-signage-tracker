//Configuration
var express = require('express');
var pg = require('pg');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var helmet = require('helmet')
var enforce = require('express-sslify');

var app = express();

app.use(helmet())

//app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.use(express.static('public'));

app.use(bodyParser.json({
    extended: false
}));

app.set('view engine', 'jade');

//Routes
app.get('/', function (req, res) {
  res.send('Hello World!');
});


//Server Init
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
