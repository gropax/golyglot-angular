angular.module('golyglot').directive('sentence', sentence);

// @todo
//     Remove `lang` attribute: can be extracted from `sentence`.
//
function sentence() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            sentence: "=value",
            langConfig: "=config"
        },

        template: "<span ng-include='sentenceTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.sentenceTemplateUrl = function () {
                return langComps.sentenceTemplateUrl($scope.language);
            };
        }
    };
}
