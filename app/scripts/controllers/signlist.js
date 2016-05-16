'use strict';

/**
 * @ngdoc function
 * @name rowSignsApp.controller:SignlistCtrl
 * @description
 * # SignlistCtrl
 * Controller of the rowSignsApp
 */
angular.module('rowSignsApp')
  .controller('SignlistCtrl', function ($scope) {

  $scope.signInspections =[
    {
      "number": "232-247",
      "street": "Taylor Dr",
      "timestamp": "2016-01-01",
      "name":"Big Lots",
      "phone":"859-552-5292",
      "email":"jmholl5@gmail.com",
      "website":"http://www.jonathan.com",
    }
  ]

  });
