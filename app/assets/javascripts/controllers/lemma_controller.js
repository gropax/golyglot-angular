angular.module('golyglot').controller('LemmaCtrl', LemmaCtrl);


function LemmaCtrl($scope, _, lang) {

    $scope.lemma = $scope.lexicalEntry.lemma;

    $scope.simplified = lang.cmn.simplified;
    $scope.pinyin = lang.cmn.pinyin;
    $scope.traditional = lang.cmn.traditional;

};

