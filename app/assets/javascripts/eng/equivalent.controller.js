angular.module('golyglot.eng').controller('EngEquivalentCtrl', EngEquivalentCtrl);

function EngEquivalentCtrl($scope, eng) {
    $scope.english = eng.getEnglish($scope.equivalent);
};

