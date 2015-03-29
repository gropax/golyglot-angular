angular.module('golyglot.cmn').controller('CmnSentenceCtrl', CmnSentenceCtrl);

function CmnSentenceCtrl($scope, cmn) {
    var reprs = $scope.sentence.textRepresentations;

    var simp = cmn.getSimplified(reprs);
    var trad = cmn.getTraditional(reprs);
    $scope.pinyin = cmn.getPinyin(reprs);

    cmnConfig = $scope.langConfig.cmn;

    $scope.characters = function() {
        return (cmnConfig.charStyle === "traditional" ? trad : simp);
    };

    $scope.showPinyin = function() {
        return cmnConfig.showPinyin;
    };
};

