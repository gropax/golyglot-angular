angular.module('golyglot.lexical-entries').directive('ggLexicalEntryFormModalButton', ggLexicalEntryFormModalButton);

function ggLexicalEntryFormModalButton() {
    return {
        restrict: 'A',
        scope: {
            model: "=ggModel",
            onSuccess: "&ggSuccess",
        },

        controller: function($rootScope, $scope) {
            $scope.openModal = function() {
                $rootScope.$broadcast('lexical-entry:form:modal:button:clicked', {
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
