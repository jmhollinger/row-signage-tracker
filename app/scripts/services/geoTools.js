'use strict';

/**
 * @ngdoc service
 * @name rowSignsApp.geoTools
 * @description
 * # geoTools
 * Factory in the rowSignsApp.
 */
 angular.module('rowSignsApp')
   .factory('geoTools', function ($http) {
     return {
       streetAddress: function (lat, lng) {
         return $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng='+ lat + ',' + lng +
         '&result_type=street_address&key=AIzaSyDXqhUx3ZQwPBtAVsXg6tz9N_2yvrRydcQ')
       },
       councilDistrict: function(lat, lng) {
         return $http.get('http://localhost:3000/api/v1/council-district/' + lat + '/' + lng)
       },
       nearestStreet: function(lat, lng) {
         return $http.get('http://localhost:3000/api/v1/nearest-street/' + lat + '/' + lng)
       }
     };
   });
