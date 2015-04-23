angular.module('golyglot').directive('ggLanguageTextForm', ggLanguageTextForm);

function ggLanguageTextForm() {
    return {
        restrict: 'EA',
        scope: {
            data: "=",
            language: "=",
        },
        templateUrl: "components/language-text-form/template.html",

        controller: function($scope, languageService, languageTemplates) {
            $scope.partial = function () {
                return languageTemplates.get('textForm', $scope.language);
            };
        }
    };
}
