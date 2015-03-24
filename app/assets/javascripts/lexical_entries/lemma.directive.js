angular.module('golyglot').directive('lemma', lemma);

function lemma() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            lemma: "=value",
        },

        template: "<span ng-include='lemmaTemplateUrl'></span>",

        controller: function($scope, lang) {
            langMod = lang[$scope.language];

            $scope.lemmaTemplateUrl = langMod.lemmaTemplateUrl;
        }
    };
}
