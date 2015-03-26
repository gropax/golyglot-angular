angular.module('golyglot.cmn').controller('CmnSentenceCtrl', CmnSentenceCtrl);

function CmnSentenceCtrl($scope, cmn) {
    var simp = cmn.getSimplified($scope.sentence);
    var trad = cmn.getTraditional($scope.sentence);

    cmnConfig = $scope.langConfig.cmn;

    $scope.pinyin = cmn.getPinyin($scope.sentence);

    $scope.characters = function() {
        return (cmnConfig.charStyle === "traditional" ? trad : simp);
    };

    $scope.showPinyin = function() {
        return cmnConfig.showPinyin;
    };
};

