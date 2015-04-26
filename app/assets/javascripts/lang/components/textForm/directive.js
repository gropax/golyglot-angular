angular.module('golyglot.lang').directive('ggLangTextForm', ggLangTextForm);

function ggLangTextForm() {
    return {
        restrict: 'EA',
        scope: {
            form: "=",
            langCode: "=",
        },
        templateUrl: "lang/components/textForm/template.html",

        controller: function($scope, lang) {
            $scope.langComp = lang(langCode).component('textForm');
        }
    };
}
