angular.module('golyglot.eng').controller('EngSentenceCtrl', EngSentenceCtrl);

function EngSentenceCtrl($scope, eng) {
    $scope.english = eng.getEnglish($scope.sentence);
};

