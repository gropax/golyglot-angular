angular.module('golyglot').directive('languageSelector', languageSelector);

function languageSelector(config, availableLanguages) {
    return {
        restrict: 'E',

        templateUrl: "lexical_entries/language_selector.html",

        controller: function($scope, config, availableLanguages) {
            $scope.languages = availableLanguages;
            $scope.secondLanguage = config.secondLanguage;
            $scope.config = config;
        }
    };
}
