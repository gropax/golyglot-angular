angular.module('golyglot').directive('ggLanguageText', ggLanguageText);

function ggLanguageText() {
    return {
        restrict: 'EA',

        scope: {
            type: "@",
            data: "=",
            language: "=",
        },

        template: "<span ng-include='partial()'></span>" +
                  "<em ng-hide='partial()'>Unknown template \"{{ type }}\"</em>",

        controller: function($scope, languageService) {
            // Use given `language` attribute if data doesn't provide it already
            // @todo
            //     cause bug in Mandarin settings
            //
            //$scope.language = $scope.language || $scope.data && $scope.data.language;

            $scope.partial = function () {
                return languageService.partial($scope.language, $scope.type);
            };
        }
    };
}
