angular.module('golyglot.lexicons').directive('ggLanguageSelector', ggLanguageSelector);

function ggLanguageSelector() {
    return {
        restrict: 'EA',
        scope: {
            language: "=",
        },

        templateUrl: 'components/language-selector/template.html',

        controller: function($scope, languageService, $log) {
            $scope.languages = languageService.availableLanguages();

            $scope.selectLanguage = function(language) {
                $scope.language = language;
            };
        }
    };
}
