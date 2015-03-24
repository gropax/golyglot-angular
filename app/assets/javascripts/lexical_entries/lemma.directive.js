angular.module('golyglot').directive('lemma', lemma);

function lemma(lang) {
    return {
        restrict: 'E',

        scope: {
            language: "@",
            value: "=",
        },

        template: "<span ng-controller='lemmaCtrl' ng-include='lemmaTemplateUrl'></span>",

        controller: function($scope, lang) {
            langMod = lang[$scope.language];

            $scope.lemmaCtrl = langMod.LemmaCtrl;
            $scope.lemmaTemplateUrl = langMod.lemmaTemplateUrl;
        }
    };
}
