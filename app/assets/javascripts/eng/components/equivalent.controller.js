angular.module('golyglot.eng').controller('EngEquivalentCtrl', EngEquivalentCtrl);

function EngEquivalentCtrl($scope, eng) {
    var reprs = $scope.equivalent.textRepresentations;

    $scope.english = eng.getEnglish(reprs);
};

