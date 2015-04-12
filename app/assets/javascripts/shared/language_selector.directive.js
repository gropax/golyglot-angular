angular.module('golyglot').directive('languageSelector', languageSelector);

languageSelector.$inject = ['languageService'];

function languageSelector(languageService) {
    return {
        restrict: 'E',

        scope: {
            language: "=",
        },

        templateUrl: "shared/language_selector.html",

        controller: function($scope, languageService) {
            $scope.languages = languageService.availableLanguages();
        }
    };
}
