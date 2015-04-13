angular.module('golyglot').directive('ggLanguageConfigPanel', ggLanguageConfigPanel);

function ggLanguageConfigPanel() {
    return {
        restrict: 'E',

        scope: {
            firstLanguage: "=",
            secondLanguage: "=",
            languageConfig: "=config",
        },

        templateUrl: "components/language_config_panel/template.html",

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
