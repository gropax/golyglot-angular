angular.module('golyglot.lexical-entries').directive('ggLexicalEntryFormModalButton', ggLexicalEntryFormModalButton);

function ggLexicalEntryFormModalButton() {
    return {
        restrict: 'EA',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },
        templateUrl: 'lexical-entries/components/lexical-entry-form-modal-button/template.html',

        controller: function($rootScope, $scope) {
            $scope.openModal = function() {
                $rootScope.$broadcast('lexical-entry:form:modal:button:clicked', {
                    model: $scope.model,
                    onSuccess: $scope.onSuccess,
                });
            };
        },

    };
}
