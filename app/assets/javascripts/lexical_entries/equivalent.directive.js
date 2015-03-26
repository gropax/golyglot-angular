angular.module('golyglot').directive('equivalent', equivalent);

// @todo
//     Remove lang attribute: can be extracted from `equivalent`
//
function equivalent() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            equivalent: "=value",
        },

        template: "<span ng-include='equivalentTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.equivalentTemplateUrl = function () {
                return langComps.equivalentTemplateUrl($scope.language);
            };
        }
    };
}
