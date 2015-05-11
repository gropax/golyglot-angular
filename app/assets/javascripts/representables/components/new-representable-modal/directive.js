angular.module('golyglot.lexical-entries').directive('ggNewRepresentableModal', ggNewRepresentableModal);

function ggNewRepresentableModal() {
    return {
        restrict: 'EA',
        scope: {},

        templateUrl: 'lexical-entries/components/new-representable-modal/template.html',

        controller: function($scope) {
            $scope.languageName = "@todo";
            $scope.representable = {};

            $scope.onRepresentableCreated = function() {
                return false;
            };
        },
    };
}
