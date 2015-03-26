angular.module('golyglot').directive('lemma', lemma);

function lemma() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            lemma: "=value",
        },

        template: "<span ng-include='lemmaTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.lemmaTemplateUrl = function () {
                return langComps.lemmaTemplateUrl($scope.language);
            };
        }
    };
}
