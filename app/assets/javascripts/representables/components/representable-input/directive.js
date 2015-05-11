angular.module('golyglot.lang').directive('ggRepresentableInput', ggRepresentableInput);

function ggRepresentableInput() {
    return {
        restrict: 'EA',
        templateUrl: "representables/components/representable-input/template.html",

        controller: function($scope, lang, $log) {
            // Change the template when language is changed
            $scope.$watch('language', function() {
                $scope.langComponent = $scope.language.component('representableInput');
            });
        }
    };
}
