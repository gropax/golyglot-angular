angular.module('golyglot').directive('ggLanguageText', ggLanguageText);

function ggLanguageText() {
    return {
        restrict: 'EA',

        scope: {
            type: "@",
            language: "=",
            data: "=",
            languageConfig: "=config",
        },

        template: "<span ng-include='partial()'></span>" +
                  "<em ng-hide='partial()'>Unknown template \"{{ type }}\"</em>",

        controller: function($scope, languageService) {
            $scope.partial = function () {
                return languageService.partial($scope.language, $scope.type);
            };

            $scope.config = function() {
                return $scope.languageConfig[$scope.language];
            }

            $scope.reprs = function() {
                if ($scope.data)
                    return $scope.data.formRepresentations || $scope.data.textRepresentations;
                else
                    return [];
            }

            $scope.text = function() {
                if ($scope.language)
                    return languageService.representations($scope.language, $scope.reprs());
                else
                    return {};
            }
        }
    };
}
