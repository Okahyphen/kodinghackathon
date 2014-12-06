/* Controllers */

/*global angular, CodeMirror */

var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('DryCtrl', ['$scope',
  function ($scope) {
    "use strict";

  }]);

appControllers.controller('WetCtrl', ['$scope',
  function ($scope) {
    "use strict";

  }]);

appControllers.controller('QuizCtrl', ['$scope', '$routeParams',
  function ($scope, $routeParams) {
    "use strict";

    var quizId, wetContainer, wetCodeMirror, dryContainer, dryCodeMirror;

    $scope.quizId = $routeParams.question;

    wetContainer = document.querySelector('.wet-container');
    wetCodeMirror = new CodeMirror(wetContainer, {
      value: 'Wet Code',
      lineNumbers: true,
      mode: 'javascript'
    });

    dryContainer = document.querySelector('.dry-container');
    dryCodeMirror = new CodeMirror(dryContainer, {
      value: 'Dry Code',
      lineNumbers: true,
      mode: 'javascript'
    });

  }]);
