angular.module('golyglot.cmn').controller('CmnSentenceCtrl', CmnSentenceCtrl);

function CmnSentenceCtrl($scope, cmn) {
    $scope.simplified = cmn.getSimplified($scope.sentence);
    $scope.pinyin = cmn.getPinyin($scope.sentence);
    $scope.traditional = cmn.getTraditional($scope.sentence);
};

