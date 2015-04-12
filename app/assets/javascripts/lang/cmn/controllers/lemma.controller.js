angular.module('golyglot.lang.cmn').controller('CmnLemmaCtrl', CmnLemmaCtrl);


function CmnLemmaCtrl($scope, cmn) {
    var reprs = $scope.lemma.formRepresentations;

    $scope.reprs = reprs;

    $scope.simplified = cmn.getSimplified(reprs);
    $scope.pinyin = cmn.getPinyin(reprs);
    $scope.traditional = cmn.getTraditional(reprs);
};

