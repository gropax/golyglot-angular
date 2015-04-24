angular.module('golyglot').directive('ggLanguageTextForm', ggLanguageTextForm);

function ggLanguageTextForm() {
    return {
        restrict: 'EA',
        scope: {
            form: "=",
            language: "=",
        },
        templateUrl: "components/language-text-form/template.html",

        controller: function($scope, languageService, languageTemplates) {
            $scope.representations = $scope.form.formRepresentations || $scope.form.textRepresentations;
            $scope.$watch('form', function() {
                $scope.representations = $scope.form.formRepresentations || $scope.form.textRepresentations;
            });

            $scope.partial = function () {
                return languageTemplates.get('textForm', $scope.language);
            };
        }
    };
}
