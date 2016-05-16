//Configuration
var express = require('express');
var fs = require('fs');
var pg = require('pg');
var bodyParser = require('body-parser');
var stormpath = require('express-stormpath');
var helmet = require('helmet')
var enforce = require('express-sslify');
var turf = require('turf')
var validation = require('validation.js')

var app = express();

app.use(helmet())

//app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.use(express.static('public'));

app.use(bodyParser.json({
    extended: false
}));

app.set('view engine', 'jade');

//Routes

app.get('/api/v1/search/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/filter/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/sign-inspection/:id', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/sign-photos/:id', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/names/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/phones/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/emails/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/websites/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.post('/api/v1/sign-inspection/', function (req, res) {
  var valid = validation.validate(
        [
          {
          "input" : req.body.timestamp,
          "label" : "Inspection timestamp",
          "validators": [validation.isNotNull]
        },
          {
          "input" : req.body.lat,
          "label" : "Latitude",
          "validators": [validation.isNotNull, validation.isNumeric]
        },
          {
          "input" : req.body.lng,
          "label" : "Longitude",
          "validators": [validation.isNotNull, validation.isNumeric]
        },
          {
          "input" : req.body.sclink,
          "label" : "SCLINK",
          "validators": [validation.isNotNull, validation.isInt]
        },
        {
          "input" : req.body.inspector,
          "label" : "Inspector Name",
          "validators":  [validation.isNotNull]
        },
        {
          "input" : req.body.images[0],
          "label" : "Image",
          "validators":  [validation.isNotNull]
        }
      ]
    )

  if (valid === true){
  //WITH (INSERT INTO sign_inspections (inspector, timestamp, lat, lng, street, sclink, name, phone, website, email, notes)
  //VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
  //returning inspection_id) AS A
  //with   
  res.json({
  })

}
  else {
  res.status(400).json(valid)
}
});

app.put('/api/v1/sign-inspection/', function (req, res) {
  var validation = {}
  if (validation.valid === true){
  //Response Here
}
  else {
  res.status(400).json(validation)
}
});

app.get('/api/v1/council-district/:lat/:lng', function (req, res) {
  var valid = validation.validate(
        [{
          "input" : req.params.lat,
          "label" : "lat",
          "validators": [validation.isNotNull, validation.isNumeric]
        },
        {
          "input" : req.params.lng,
          "label" : "lng",
          "validators":  [validation.isNotNull, validation.isNumeric]
        }
      ]
    )

  if (valid === true){

    fs.readFile('data/councilDistricts.geojson', handleFile)

    function handleFile(err, data) {
        if (err) throw err
        var point =
        {
        "type": "FeatureCollection",
        "features" : [
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  req.params.lng,
                  req.params.lat
                ]
              }
            }
          ]
        }

        var councilDistricts = JSON.parse(data)
        var returnedFeature = turf.tag(point, councilDistricts, 'DISTRICT', 'DISTRICT')
        if(returnedFeature){
          res.json({
            "success": true,
            "district" : returnedFeature.features[0].properties.DISTRICT,
          })
        }
    }
}
  else
  res.status(400).json(valid)
});

app.get('/api/v1/nearest-street/:lat/:lng', function (req, res) {
  var valid = validation.validate(
        [{
          "input" : req.params.lat,
          "label" : "lat",
          "validators": [validation.isNotNull, validation.isNumeric]
        },
        {
          "input" : req.params.lng,
          "label" : "lng",
          "validators":  [validation.isNotNull, validation.isNumeric]
        }
      ]
    )

  if (valid === true){

    fs.readFile('data/streetPoints.geojson', handleFile)

    function handleFile(err, data) {
        if (err) throw err
        var point =
            {
              "type": "Feature",
              "properties": {},
              "geometry": {
                "type": "Point",
                "coordinates": [
                  req.params.lng,
                  req.params.lat
                ]
              }
            }

        var streetPoints = JSON.parse(data)
        var returnedFeature = turf.nearest(point, streetPoints)
        if(returnedFeature){
          var low = Math.min(returnedFeature.properties.LFROM, returnedFeature.properties.RFROM)
          var high = Math.max(returnedFeature.properties.LTO, returnedFeature.properties.RTO)
          res.json({
            "success": true,
            "street" : returnedFeature.properties.ANNO,
            "sclink" : returnedFeature.properties.SCLINK,
            "from" : low,
            "to" : high
          })
        }
    }
}
  else
  res.status(400).json(valid)
});


//Server
var server = app.listen(process.env.PORT || 3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App listening at http://%s:%s', host, port);
});
