angular.module('golyglot').directive('equivalent', equivalent);

// @todo
//     Use `langComps` instead of `lang`
//
function equivalent() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            equivalent: "=value",
        },

        template: "<span ng-include='equivalentTemplateUrl'></span>",

        controller: function($scope, lang) {
            langMod = lang[$scope.language];

            $scope.equivalentTemplateUrl = langMod.equivalentTemplateUrl;
        }
    };
}
