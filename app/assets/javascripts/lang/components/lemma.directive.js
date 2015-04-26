angular.module('golyglot.lang').directive('ggLangLemma', ggLangLemma);

function ggLangLemma() {
    return {
        restrict: 'EA',
        scope: {
            model: "=",
            langCode: "=",
        },
        templateUrl: 'lang/components/text/template.html',

        controller: function($scope, lang) {
            $scope.langComp = lang($scope.langCode).component('lemma');
        }
    };
}
