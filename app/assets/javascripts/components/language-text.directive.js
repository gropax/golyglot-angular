angular.module('golyglot').directive('ggLanguageText', ggLanguageText);

function ggLanguageText() {
    return {
        restrict: 'EA',

        scope: {
            type: "@",
            language: "=",
            data: "=",
        },

        template: "<span ng-include='partial()'></span>" +
                  "<em ng-hide='partial()'>Unknown template \"{{ type }}\"</em>",

        controller: function($scope, languageService) {
            $scope.partial = function () {
                return languageService.partial($scope.language, $scope.type);
            };
        }
    };
}
