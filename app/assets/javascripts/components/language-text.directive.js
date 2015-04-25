angular.module('golyglot').directive('ggLanguageText', ggLanguageText);

function ggLanguageText() {
    return {
        restrict: 'EA',

        scope: {
            type: "@",
            data: "=",
            language: "=",
        },

        template: "<span ng-include='template()'></span>",

        controller: function($scope, languageService, languageTemplates) {
            $scope.template = function () {
                return languageTemplates.get($scope.type, $scope.language);
            };
        }
    };
}
