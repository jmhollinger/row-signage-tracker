'use strict';

/**
 * @ngdoc overview
 * @name rowSignsApp
 * @description
 * # rowSignsApp
 *
 * Main module of the application
 */
angular
  .module('rowSignsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .state('newSign', {
        url: '/sign/new/',
        templateUrl: 'views/newsign.html',
        controller: 'NewsignCtrl'
      })
      .state('editSign', {
        url: '/sign/edit/{projectId:int}',
        templateUrl: 'views/editsign.html',
        controller: 'EditsignCtrl'
      })
      .state('signList', {
        url: '/signs',
        templateUrl: 'views/signlist.html',
        controller: 'SignlistCtrl'
      })
      .state('signDetail', {
        url: '/sign/{projectId:int}',
        templateUrl: 'views/signdetail.html',
        controller: 'SigndetailCtrl'
      })
      .state('reports', {
        url: '/reports',
        templateUrl: 'views/reports.html',
        controller: 'ReportsCtrl'
      });
  });
