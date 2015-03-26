angular.module('golyglot').directive('languageSelector', languageSelector);

function languageSelector(config, availableLanguages) {
    return {
        restrict: 'E',

        scope: {
            language: "=value",
        },

        templateUrl: "lexical_entries/language_selector.html",

        controller: function($scope, availableLanguages) {
            $scope.languages = availableLanguages;
        }
    };
}
