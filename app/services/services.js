/* Services */
/*global angular, CodeMirror */

var appServices = angular.module('appServices', []);

appServices.service('quiz', ['$window',
  function ($window) {
    "use strict";
    var score, questionsAnswered;

    score = 0;
    questionsAnswered = [];

    function createMirrors(wetCode, dryCode) {
      var wetContainer, wetCodeMirror, dryContainer, dryCodeMirror;

      wetContainer = document.querySelector('.wet-container');
      wetCodeMirror = new CodeMirror(wetContainer, {
        value: wetCode,
        lineNumbers: true,
        mode: 'javascript',
        tabSize: 2,
        theme: 'monokai'
      });

      dryContainer = document.querySelector('.dry-container');
      dryCodeMirror = new CodeMirror(dryContainer, {
        value: dryCode,
        lineNumbers: true,
        mode: 'javascript',
        tabSize: 2,
        theme: 'monokai'
      });
    }

    return {
      createMirrors: function (wetCode, dryCode) {
        createMirrors(wetCode, dryCode);
      },
      checkIfAnswered: function (questionId) {
        if (questionsAnswered.indexOf(questionId) > -1) {
          return true;
        } else {
          return false;
        }
      },
      correctAnswer: function (questionId) {
        score += 3;
        questionsAnswered.push(questionId);
      },
      incorrectAnswer: function () {
        if (score - 1 < 0) {
          score = 0;
        } else {
          score -= 1;
        }
      },
      getScore: function () {
        return score;
      },
      resetScore: function () {
        score = 0;
      }
    };
  }]);
