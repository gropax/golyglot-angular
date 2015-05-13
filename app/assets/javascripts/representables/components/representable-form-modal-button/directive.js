angular.module('golyglot.representables').directive('ggRepresentableFormModalButton', ggRepresentableFormModalButton);

function ggRepresentableFormModalButton() {
    return {
        restrict: 'EA',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },
        templateUrl: 'representables/components/representable-form-modal-button/template.html',

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
