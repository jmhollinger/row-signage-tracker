'use strict';

/**
 * @ngdoc overview
 * @name rowSignsApp
 * @description
 * # rowSignsApp
 *
 * Main module of the application.
 */
angular
  .module('rowSignsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {

    $routeProvider.
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/newSign', {
        templateUrl: 'views/newsign.html',
        controller: 'NewsignCtrl',
        controllerAs: 'newSign'
      })
      .when('/editSign', {
        templateUrl: 'views/editsign.html',
        controller: 'EditsignCtrl',
        controllerAs: 'editSign'
      })
      .when('/signList', {
        templateUrl: 'views/signlist.html',
        controller: 'SignlistCtrl',
        controllerAs: 'signList'
      })
      .when('/signDetail', {
        templateUrl: 'views/signdetail.html',
        controller: 'SigndetailCtrl',
        controllerAs: 'signDetail'
      })
      .when('/reports', {
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl',
        controllerAs: 'reports'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
