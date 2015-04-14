angular.module('golyglot').directive('ggLanguageConfigPanel', ggLanguageConfigPanel);

function ggLanguageConfigPanel() {
    return {
        restrict: 'EA',

        scope: {
            firstLanguage: "=",
            secondLanguage: "=",
        },

        templateUrl: "components/language_config_panel/template.html",

        controller: function($scope, languageService) {
        }
    };
}
