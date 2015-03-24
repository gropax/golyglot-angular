angular.module('golyglot.lang.cmn').service('cmn', cmn);

function cmn(std) {

    this.LemmaCtrl = LemmaCtrl;
    this.lemmaTemplateUrl = "cmn/lemma.html";

    this.getPinyin = std.representation("orthographyName", "pinyin");
    this.getSimplified = std.representation("script", "Hans");
    this.getTraditional = std.representation("script", "Hant");


    function LemmaCtrl($scope, _, lang) {

        $scope.simplified = lang.cmn.getSimplified($scope.value);
        $scope.pinyin = lang.cmn.getPinyin($scope.value);
        $scope.traditional = lang.cmn.getTraditional($scope.value);

    };


}
