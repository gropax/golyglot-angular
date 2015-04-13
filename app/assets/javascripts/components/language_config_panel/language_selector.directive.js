angular.module('golyglot').directive('ggLanguageSelector', ggLanguageSelector);

ggLanguageSelector.$inject = ['languageService'];

function ggLanguageSelector(languageService) {
    return {
        restrict: 'E',

        scope: {
            language: "=",
        },

        templateUrl: "components/language_config_panel/language_selector.html",

        controller: function($scope, languageService) {
            $scope.languages = languageService.availableLanguages();
        }
    };
}
