angular.module('golyglot.lexicons').directive('ggLanguageSelector', ggLanguageSelector);

function ggLanguageSelector() {
    return {
        restrict: 'EA',
        scope: {
            language: "=",
        },

        templateUrl: 'components/language-selector/template.html',

        controller: function($scope, lang, $log) {
            $scope.languages = lang.all();

            $scope.selectLanguage = function(language) {
                $scope.language = language;
            };
        }
    };
}
