angular.module('golyglot.core').directive('ggNewLexicalEntryForm', ggNewLexicalEntryForm);

function ggNewLexicalEntryForm() {
    return {
        restrict: 'EA',
        scope: {
            langCode: '=',
            lexiconId: '=',
            onSuccess: '&',
        },
        templateUrl: 'components/new-lexical-entry-form/template.html',

        controller: function($scope, LexicalEntry) {

            $scope.$watch('langCode', function() {
                resetModel();
            });

            $scope.submit = function() {
                $scope.lexicalEntry.create().then(function() {
                    resetModel();
                    // Execute callback function
                    $scope.onSuccess();
                }, function(error) {
                    // handle errors
                });
            };

            function resetModel() {
                $scope.lexicalEntry = new LexicalEntry({
                    language: $scope.langCode,
                    lexiconId: $scope.lexiconId,
                });
            }

        },
    };
}
