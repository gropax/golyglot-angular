angular.module('golyglot.cmn').controller('CmnLemmaCtrl', CmnLemmaCtrl);


function CmnLemmaCtrl($scope, cmn) {

    $scope.simplified = cmn.getSimplified($scope.value);
    $scope.pinyin = cmn.getPinyin($scope.value);
    $scope.traditional = cmn.getTraditional($scope.value);

};

