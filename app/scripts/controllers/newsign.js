'use strict';

/**
 * @ngdoc function
 * @name rowSignsApp.controller:NewsignCtrl
 * @description
 * # NewsignCtrl
 * Controller of the rowSignsApp
 */
angular.module('rowSignsApp')
  .controller('NewsignCtrl', function ($scope, $location, geoTools) {

    $scope.inspectionData = {
      "inspector" : "loggedInUser",
      "images": []
    }



    $scope.save = function(){
      console.log($scope.inspectionData)
    }

    $scope.delete = function(item) {
      var index = $scope.inspectionData.images.indexOf(item);
      $scope.inspectionData.images.splice(index, 1);
    }

    document.getElementById("picture").onchange =

    function imageResize() {
  var dataurl = null;
  var file = document.getElementById('picture').files[0];
  var img = document.createElement("img");
  var reader = new FileReader();

  reader.onload = function(e)
      {
    img.src = e.target.result;

    img.onload = function () {
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);

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

              dataurl = canvas.toDataURL("image/jpeg");
              $scope.$apply(function () {
              $scope.inspectionData.images.push(dataurl)
              })

  }
  }
  reader.readAsDataURL(file);
  };



    var map = function(){

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
      geoTools.councilDistrict(evt.latLng.lat(), evt.latLng.lng()).then(function(result) {
          if(result.data.success === true){
          $scope.inspectionData.councilDistrict = result.data.district;
        }
      })
      geoTools.nearestStreet(evt.latLng.lat(), evt.latLng.lng()).then(function(result) {
          if(result.data.success === true){
          $scope.inspectionData.number = result.data.from + '-' + result.data.to;
          $scope.inspectionData.street = result.data.street;
          $scope.inspectionData.sclink = result.data.sclink;
          $scope.inspectionData.lat = evt.latLng.lat();
          $scope.inspectionData.lng = evt.latLng.lng();
        }
      })
    });

            // Try HTML5 geolocation.
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                };
                geoTools.councilDistrict(pos.lat, pos.lng).then(function(result) {
                    if(result.data.success === true){
                    $scope.inspectionData.councilDistrict = result.data.district;
                  }
                })
                geoTools.nearestStreet(pos.lat, pos.lng).then(function(result) {
                    if(result.data.success === true){
                    $scope.inspectionData.number = result.data.from + '-' + result.data.to;
                    $scope.inspectionData.street = result.data.street;
                    $scope.inspectionData.sclink = result.data.sclink;
                    $scope.inspectionData.lat = pos.lat;
                    $scope.inspectionData.lng = pos.lng;
                  }
                })
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

      map()

  });
