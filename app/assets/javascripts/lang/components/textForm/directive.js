angular.module('golyglot.lang').directive('ggLangTextForm', ggLangTextForm);

function ggLangTextForm() {
    return {
        restrict: 'EA',
        scope: {
            model: "=",
            langCode: "=",
        },
        templateUrl: "lang/components/textForm/template.html",

        controller: function($scope, lang, $log) {
            $scope.$watch('langCode', function() {
                $scope.langComp = lang($scope.langCode).component('textForm');
            });
        }
    };
}
