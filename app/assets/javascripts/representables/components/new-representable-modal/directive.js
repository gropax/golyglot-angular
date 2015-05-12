angular.module('golyglot.representables').directive('ggNewRepresentableModal', ggNewRepresentableModal);

function ggNewRepresentableModal() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'representables/components/new-representable-modal/template.html',

        controller: function($scope) {

            $scope.$on('new:representable:modal:button:clicked', function(event, args) {
                $scope.openModal(args);
            });

            $scope.openModal = function(args) {
                // Add arguments to the scope
                $scope.model = args.model;
                $scope.buttonSuccessCallback = args.onSuccess;
                // Show modal
                $('#newRepresentableModal').modal('show');
            };

            $scope.closeModal = function() {
                // Reset attributes
                $scope.model = undefined;
                $scope.buttonSuccessCallback = undefined;
                // Close modal
                $('#newRepresentableModal').modal('hide');
            };

            $scope.languageName = "@todo";

            $scope.onSuccess = function() {
                // Call button callback
                $scope.buttonSuccessCallback && $scope.buttonSuccessCallback();
                // Close modal
                $scope.closeModal();
            };
        },
    };
}
