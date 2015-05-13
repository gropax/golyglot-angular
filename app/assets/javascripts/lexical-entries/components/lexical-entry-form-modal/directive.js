angular.module('golyglot.lexical-entries').directive('ggLexicalEntryFormModal', ggLexicalEntryFormModal);

function ggLexicalEntryFormModal() {
    return {
        restrict: 'EA',
        scope: {},
        templateUrl: 'lexical-entries/components/lexical-entry-form-modal/template.html',

        controller: function($scope) {

            $scope.$on('lexical-entry:form:modal:button:clicked', function(event, args) {
                $scope.openModal(args);
            });

            $scope.openModal = function(args) {
                // Add arguments to the scope
                $scope.model = args.model;
                $scope.buttonSuccessCallback = args.onSuccess;
                // Show modal
                $('#LexicalEntryFormModal').modal('show');
            };

            $scope.closeModal = function() {
                // Reset attributes
                $scope.model = undefined;
                $scope.buttonSuccessCallback = undefined;
                // Close modal
                $('#LexicalEntryFormModal').modal('hide');
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
