/* App */
/*global angular */

var DRYvsWET = angular.module('DRYvsWET', [
  'ngRoute',
  'appControllers'
]);

DRYvsWET.config(['$routeProvider',
  function ($routeProvider) {
    "use strict";

    $routeProvider
      .when('/dry', {
        templateUrl: 'app/views/dry.html',
        controller: 'DryCtrl'
      })
      .when('/wet', {
        templateUrl: 'app/views/wet.html',
        controller: 'WetCtrl'
      })
      .when('/quiz/:question', {
        templateUrl: 'app/views/quiz.html',
        controller: 'QuizCtrl'
      })
      .when('/end', {
        templateUrl: 'app/views/end.html',
        controller: 'EndCtrl'
      })
      .otherwise({
        redirectTo: '/dry'
      });
  }]);
