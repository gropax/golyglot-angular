angular.module('golyglot.lang.cmn').service('cmn', cmn);

function cmn(std) {

    this.LemmaCtrl = LemmaCtrl;
    this.lemmaTemplate = "cmn/lemma.html";
    this.pinyin = std.representation("orthographyName", "pinyin");
    this.simplified = std.representation("script", "Hans");
    this.traditional = std.representation("script", "Hant");


    function LemmaCtrl($scope, _, lang) {
        $scope.test = "Chinese Lemma Controller";

        $scope.lemma = $scope.lexicalEntry.lemma;

        $scope.simplified = lang.cmn.simplified;
        $scope.pinyin = lang.cmn.pinyin;
        $scope.traditional = lang.cmn.traditional;

    };


}
