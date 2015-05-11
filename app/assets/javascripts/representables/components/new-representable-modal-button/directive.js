angular.module('golyglot.lexical-entries').directive('ggNewRepresentableModalButton', ggNewRepresentableModalButton);

function ggNewRepresentableModalButton() {
    return {
        restrict: 'EA',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },
        templateUrl: 'lexical_entries/components/new-representable-modal-button.html',

        controller: function($scope) {
            $scope.openModal = function() {
                // Send event with `model` as param
                return false;
            };
        },

    };
}
