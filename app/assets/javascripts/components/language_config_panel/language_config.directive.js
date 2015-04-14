angular.module('golyglot').directive('ggLanguageConfig', ggLanguageConfig);

function ggLanguageConfig() {
    return {
        restrict: 'E',

        scope: {
            language: "=",
        },

        templateUrl: "components/language_config_panel/language_config.html",

        controller: function($scope, languageService) {
            $scope.partial = function () {
                return languageService.partial($scope.language, 'config');
            };
        }
    };
}
