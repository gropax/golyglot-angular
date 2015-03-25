angular.module('golyglot.std').controller('StdSentenceCtrl', StdSentenceCtrl);

function StdSentenceCtrl($scope, std) {
    $scope.writtenForm = $scope.sentence.representations[0].writtenForm;
};

