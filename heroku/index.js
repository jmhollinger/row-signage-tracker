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

app.get('api/v1/search/', function (req, res) {
  res.send('Sign By ID');
});

app.get('api/v1/filter/', function (req, res) {
  res.send('Sign By ID');
});

app.get('api/v1/sign-inspection/:id', function (req, res) {
  res.send('Sign By ID');
});

app.get('api/v1/sign-photos/:id', function (req, res) {
  res.send('Sign By ID');
});

app.get('api/v1/names/', function (req, res) {
  res.send('Unique Names');
});

app.get('api/v1/phones/', function (req, res) {
  res.send('Unique Phones');
});

app.get('api/v1/emails/', function (req, res) {
  res.send('Unique Emails');
});

app.get('api/v1/websites/', function (req, res) {
  res.send('Unique Websites');
});

app.post('api/v1/sign-inspection/', function (req, res) {
  res.send('Create Inspection');
});

app.put('api/v1/sign-inspection/', function (req, res) {
  res.send('Edit Inspection');
});


//Server
var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
