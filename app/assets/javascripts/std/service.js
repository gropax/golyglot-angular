angular.module('golyglot.std').service('std', std);

function std() {

    this.LemmaCtrl = LemmaCtrl;
    this.representation = representation;


    function representation(key, val) {
        var fn = function(form) {
            repr = _.detect(form.representations, function(r) {
                return r[key] === val;
            });
            return repr.writtenForm;
        };

        return fn;
    }

    function LemmaCtrl($scope, _, lang) {
        $scope.test = "Standard Lemma Controller";

        $scope.lemma = $scope.lexicalEntry.lemma;

        $scope.simplified = lang.cmn.simplified;
        $scope.pinyin = lang.cmn.pinyin;
        $scope.traditional = lang.cmn.traditional;

    };

}
