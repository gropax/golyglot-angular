angular.module('golyglot.representables').directive('ggRepresentableFormModalButton', ggRepresentableFormModalButton);

function ggRepresentableFormModalButton() {
    return {
        restrict: 'A',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },

        controller: function($rootScope, $scope) {
            $scope.openModal = function() {
                $rootScope.$broadcast('new:representable:modal:button:clicked', {
                    model: $scope.model,
                    onSuccess: $scope.onSuccess,
                });
            };
        },

        link: function(scope, element, attrs) {
            element.on('click', function() {
                scope.openModal();
            });
        },

    };
}
