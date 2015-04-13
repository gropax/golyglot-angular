angular.module('golyglot').directive('ggLanguageConfig', ggLanguageConfig);

function ggLanguageConfig() {
    return {
        restrict: 'E',

        scope: {
            language: "=",
            languageConfig: "=config",
        },

        templateUrl: "components/language_config_panel/language_config.html",

        controller: function($scope, languageService, $log) {
            $scope.partial = function () {
                return languageService.partial($scope.language, 'config');
            };

            $scope.config = function() {
                return $scope.languageConfig[$scope.language];
            }
        }
    };
}
