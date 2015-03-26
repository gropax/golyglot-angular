angular.module('golyglot').directive('languageConfig', languageConfig);

// @todo
//     Restrict language config here.
//
function languageConfig() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            langConfig: "=config",
        },

        template: "<span ng-include='configTemplateUrl()'></span>",

        controller: function($scope, langComps) {
            $scope.configTemplateUrl = function () {
                return langComps.configTemplateUrl($scope.language);
            };
        }
    };
}
