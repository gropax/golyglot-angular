angular.module('golyglot').directive('ggLanguageTextForm', ggLanguageTextForm);

function ggLanguageTextForm() {
    return {
        restrict: 'EA',
        scope: {
            form: "=",
            language: "=",
        },
        //templateUrl: "components/language-text-form/template.html",
        template: "<div ng-include='template()'></div>",

        controller: function($scope, languageService, languageTemplates, $log) {
            $scope.template = function () {
                return languageTemplates.get('textForm', $scope.language);
            };

            // When the `language` is changed dynamically, reset the form's
            // `representations` so they can be populated again with the
            // `representations` of the new language, in the language-specific
            // controller, when the template is loaded.
            //
            $scope.$watch('language', function() {
                $scope.form.representations = [];
            });
        }
    };
}
