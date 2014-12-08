/* Controllers */

/*global angular, CodeMirror, $ */

var appControllers = angular.module('appControllers', ['appServices']);

appControllers.controller('DryCtrl', ['$scope', 'quiz',
  function ($scope, quiz) {
    "use strict";

    quiz.reset();
  }]);

appControllers.controller('WetCtrl', ['$scope', '$timeout', 'quiz',
  function ($scope, $timeout, quiz) {
    "use strict";

    var subtitle = document.querySelector('.page-subtitle--wet');

    quiz.reset();

    $scope.subtitles = [
      'We Enjoy Typing',
      'Write Everything Twice',
      'We Edit Tons',
      'Written Every Time'
    ];

    $timeout.cancel($scope.timer);

    $scope.setSubtitle = function (index) {
      if (index >= $scope.subtitles.length) {
        index = 0;
      }
      subtitle.innerHTML = $scope.subtitles[index];
      $scope.timer = $timeout(function () {
        $scope.setSubtitle(index + 1);
      }, 1500);
    };

    $scope.setSubtitle(0);

  }]);

appControllers.controller('QuizCtrl', ['$scope', '$http', '$routeParams', '$timeout', 'quiz', '$window',
  function ($scope, $http, $routeParams, $timeout, quiz, $window) {
    "use strict";

    $scope.question = Number($routeParams.question);
    $scope.quizId = $scope.question - 1;

    if ($scope.question > 1) {
      // Kick out user if refresh, or tries to navigate directly to a question
      if (!quiz.checkIfAnswered($scope.question - 1)) {
        window.location = '/';
      }
    }

    $scope.nextQuestion = '#/quiz/' + String($scope.question + 1);

    // Reveal answer if already answered
    if (quiz.checkIfAnswered($scope.question)) {
      $scope.revealAnswer = true;
    } else {
      $scope.revealAnswer = false;
    }

    $scope.wrongAnswer = false;
    $scope.endReached = false;


    $scope.questions = quiz.getQuestions();

    $scope.questions.success(function (data) {
      quiz.createMirrors(data[$scope.quizId].wetCode, data[$scope.quizId].dryCode);

      $scope.answerList = data[$scope.quizId].selection;
      $scope.questionText = data[$scope.quizId].questionText;
      $scope.answer = data[$scope.quizId].answer;
      $scope.answerText = data[$scope.quizId].answerText;
      $scope.notes = data[$scope.quizId].notes;

      if ($scope.question + 1 > data.length) {
        $scope.nextQuestion = '#/end';
        $scope.endReached = 'That\'s it! Click here to continue.';
      }
    });


    $scope.setScore = function () {
      $scope.score = quiz.getScore();
    };

    $scope.chooseAnswer = function (index) {
      if (index === $scope.answer) {
        quiz.correctAnswer($scope.question);
        $scope.revealAnswer = true;
        $scope.wrongAnswer = false;
        $scope.setScore();
      } else {
        quiz.incorrectAnswer();
        $scope.wrongAnswer = true;
        $scope.setScore();
        $timeout.cancel($scope.timer);
        $scope.timer = $timeout(function () {
          $scope.wrongAnswer = false;
        }, 1000);
      }
    };

    $scope.setScore();
  }]);

appControllers.controller('EndCtrl', ['$scope', 'quiz',
  function ($scope, quiz) {
    "use strict";

    $scope.score = quiz.getScore();

    if ($scope.score === 15) {
      $scope.grats = 'Perfect!';
    } else if ($scope.score >= 10) {
      $scope.grats = 'Well Done!';
    } else if ($scope.score >= 5) {
      $scope.grats = 'Keep Trying!';
    } else {
      $scope.grats = 'Better Luck Next Time!';
    }

    if ($scope.score >= 10) {
      $scope.again = '#/dry';
    } else {
      $scope.again = '#/wet';
    }

  }]);
