angular.module('golyglot.eng').controller('EngSentenceCtrl', EngSentenceCtrl);

function EngSentenceCtrl($scope, eng) {
    var reprs = $scope.sentence.textRepresentations;

    $scope.english = eng.getEnglish(reprs);
};

