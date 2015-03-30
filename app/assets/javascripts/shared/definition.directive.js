angular.module('golyglot').directive('definition', definition);

// @todo
//     Remove lang attribute: can be extracted from `definition`
//
function definition() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            definition: "=value",
        },

        template: "<span ng-include='definitionTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.definitionTemplateUrl = function () {
                return langComps.definitionTemplateUrl($scope.language);
            };
        }
    };
}
