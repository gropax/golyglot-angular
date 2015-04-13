angular.module('golyglot').directive('lemma', lemma);

function lemma() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            form: "=value",
            config: "=",
        },

        template: "<span ng-include='partial()'></span>",

        controller: function($scope, languageService) {
            var language = $scope.language;

            $scope.partial = function () {
                return languageService.partial(language, 'lemma');
            };

            // Import representation getters and config variables into the
            // controller `$scope`.
            //
            // @note
            //     languageService#importHelpersIn` reads the `language`, `form`
            //     and `config` properties of the `$scope` variable.
            //
            languageService.importHelpersIn($scope);
        }
    };
}
