angular.module('golyglot.lexical-entries').directive('ggEditLemmaForm', ggEditLemmaForm);

function ggEditLemmaForm() {
    return {
        restrict: 'EA',
        scope: {
            langCode: '=',
            original: '=model',
            onSuccess: '&',
        },
        templateUrl: 'lexical-entries/components/edit-lemma-form/template.html',

        controller: function($scope, LexicalEntry) {
            // Duplicate not to modify the original
            $scope.model = $scope.original.clone();

            $scope.submit = function() {
                $scope.model.update().then(function() {
                    // Replace the old one by the new
                    $scope.original = $scope.model;
                    // Execute callback function
                    $scope.onSuccess();
                }, function(error) {
                    // handle errors
                });
            };
        },
    };
}
