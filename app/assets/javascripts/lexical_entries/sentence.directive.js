angular.module('golyglot').directive('sentence', sentence);

function sentence() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            sentence: "=value",
        },

        template: "<span ng-include='sentenceTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.sentenceTemplateUrl = function () {
                return langComps.sentenceTemplateUrl($scope.language);
            };
        }
    };
}
