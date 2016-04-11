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

  //Go ahead and create an empty marker set for address searching.
  var markers = [];
  
  //Set your basic options.
  var mapOptions = {
    overviewMapControl:true,
    rotateControl:true,
    scaleControl:true,
    mapTypeControl: true,
    mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR, position:google.maps.ControlPosition.TOP_CENTER},
    zoomControl: true,
    zoomControlOptions: {style: google.maps.ZoomControlStyle.DEFAULT}
    };

  //Fill up the map-canvas.
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  //Set default map bounds, expressed as southwest and northeast points.
  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(37.921971, -84.663139),
      new google.maps.LatLng(38.155595, -84.334923)
      );
  
  map.fitBounds(defaultBounds);

var marker = new google.maps.Marker({
    map: map,
    draggable: true
  });

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

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