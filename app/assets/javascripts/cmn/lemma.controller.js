angular.module('golyglot.cmn').controller('CmnLemmaCtrl', CmnLemmaCtrl);


function CmnLemmaCtrl($scope, cmn) {
    $scope.simplified = cmn.getSimplified($scope.lemma);
    $scope.pinyin = cmn.getPinyin($scope.lemma);
    $scope.traditional = cmn.getTraditional($scope.lemma);
};

