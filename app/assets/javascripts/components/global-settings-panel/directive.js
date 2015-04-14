angular.module('golyglot').directive('ggGlobalSettingsPanel', ggGlobalSettingsPanel);

ggGlobalSettingsPanel.$inject = ['languageService'];

function ggGlobalSettingsPanel(languageService) {
    return {
        restrict: 'EA',

        scope: {
            language: "=",
        },

        templateUrl: "components/global-settings-panel/template.html",

        controller: function($scope, languageService) {
            $scope.languages = languageService.availableLanguages();
        }
    };
}
