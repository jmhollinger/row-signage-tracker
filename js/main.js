//Listeners
$( "#picture" ).change(function(){
  imageResize()
});

$( "#submit" ).click(function(){
  save()
});

//Firebase
var db = new Firebase("https://lex-row-signs.firebaseio.com/signReports")

function save (){
 var save = db.push({
  "submissionTimestamp" : moment().format(), 
  "datetime" : $("#datetime").val(),
  "inspector" : $("#inspector").val(),
  "name" : $("#name").val(),
  "phone" : $("#phone").val(),
  "website" : $("#URL").val(),
  "email" : $("#email").val(),
  "coordinates" : {"lat": $("#lat").val() ,"lng": $("#lng").val()},
  "photo" : $("#photoData").val()
}, function(){
window.location.pathname = "/row-signage-tracker/";
})
}

//Image Resizer
function imageResize() {
        var file = document.getElementById('picture').files[0];
        var dataUrl = "";
        // Create an image
        var img = document.createElement("img");
        // Create a file reader
        var reader = new FileReader();
        // Set the image once loaded into file reader
        reader.onload = function(e)
        {
            img.src = e.target.result;
    
            var canvas = document.createElement("canvas");
            //var canvas = $("<canvas>", {"id":"testing"})[0];
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
    
            // Set Width and Height
            var MAX_WIDTH = 800;
            var MAX_HEIGHT = 600;
            var width = img.width;
            var height = img.height;
    
            if (width > height) {
              if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
              }
            } else {
              if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
              }
            }
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
  
            dataUrl = canvas.toDataURL("image/jpeg");
            $("#photoData").val(dataUrl)      
        }
        // Load files into file reader
        reader.readAsDataURL(file);
      }

//Date & Time Picker
$(function () {
                $('#datetimepicker1').datetimepicker({
                    defaultDate: moment()
                })
              });

//Inspector URL Parameter
function getUrlParameter(sParam){
var sPageURL = window.location.search.substring(1);
var sURLVariables = sPageURL.split('&');
for (var i = 0; i < sURLVariables.length; i++) 
{
var sParameterName = sURLVariables[i].split('=');
if (sParameterName[0] == sParam) 
   {return sParameterName[1];}}}

$("#inspector").val(decodeURIComponent(getUrlParameter('inspector')))


//Map
function initMap(){
  
  var mapOptions = {
    overviewMapControl:true,
    rotateControl:true,
    scaleControl:true,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position:google.maps.ControlPosition.TOP_CENTER},
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT}
    };

  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var geocoder = new google.maps.Geocoder;

  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.921971, -84.663139),
      new google.maps.LatLng(38.155595, -84.334923)
      );
  
  map.fitBounds(defaultBounds);

var marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

google.maps.event.addListener(marker, 'dragend', function(evt){
    $('#lat').val(evt.latLng.lat()); $('#lng').val(evt.latLng.lng());
});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            $('#lat').val(pos.lat); $('#lng').val(pos.lng);
            marker.setPosition(pos);
            map.setCenter(pos);
            map.setZoom(18);
          }, function() {
            handleLocationError(true, marker, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, marker, map.getCenter());
        }


  }
