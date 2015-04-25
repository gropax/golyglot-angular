angular.module('golyglot.lang').directive('ggLangLemma', ggLangLemma);

function ggLangLemma() {
    return {
        restrict: 'EA',
        scope: {
            data: "=",
            langCode: "=",
        },
        templateUrl: 'lang/components/text/template.html',

        controller: function($scope, lang) {
            $scope.langComp = lang(langCode).component('lemma');
        }
    };
}
