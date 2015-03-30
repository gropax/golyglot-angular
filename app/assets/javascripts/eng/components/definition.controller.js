angular.module('golyglot.eng').controller('EngDefinitionCtrl', EngDefinitionCtrl);

function EngDefinitionCtrl($scope, eng) {
    var reprs = $scope.definition.textRepresentations;

    $scope.english = eng.getEnglish(reprs);
};

