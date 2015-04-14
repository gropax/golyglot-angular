angular.module('golyglot').directive('ggLanguageSettingsPanel', ggLanguageSettingsPanel);

function ggLanguageSettingsPanel() {
    return {
        restrict: 'EA',

        scope: {
            language: "=",
        },

        templateUrl: "components/language-settings-panel/template.html",

        controller: function($scope, languageService) {
            $scope.partial = function () {
                return languageService.partial($scope.language, 'config');
            };
        }
    };
}
