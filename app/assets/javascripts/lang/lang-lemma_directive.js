angular.module('golyglot.lang').directive('lemma', lemma);

function lemma(lang) {
    return {
        restrict: 'E',

        scope: {
            language: "@",
            value: "=",
        },

        controller: function($scope, lang) {
            langMod = lang[$scope.language];

            $scope.lemmaCtrl = langMod.LemmaCtrl;
            $scope.lemmaTemplateUrl = langMod.lemmaTemplateUrl;
        },

        templateUrl: "lemma.html"
    };
}
