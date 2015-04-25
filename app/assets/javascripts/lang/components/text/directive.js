angular.module('golyglot.lang').directive('ggLangText', ggLangText);

function ggLangText() {
    return {
        restrict: 'EA',
        scope: {
            data: "=",
            langCode: "=",
        },
        templateUrl: 'lang/components/text/template.html',

        controller: function($scope, lang) {
            $scope.langComp = lang(langCode).component('text');
        }
    };
}
