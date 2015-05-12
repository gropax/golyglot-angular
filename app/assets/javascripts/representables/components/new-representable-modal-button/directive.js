angular.module('golyglot.representables').directive('ggNewRepresentableModalButton', ggNewRepresentableModalButton);

function ggNewRepresentableModalButton() {
    return {
        restrict: 'EA',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },
        templateUrl: 'representables/components/new-representable-modal-button/template.html',

        controller: function($rootScope, $scope) {
            $scope.openModal = function() {
                $rootScope.$broadcast('new:representable:modal:button:clicked', {
                    model: $scope.model,
                    onSuccess: $scope.onSuccess,
                });
            };
        },

    };
}
