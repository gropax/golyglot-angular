angular.module('golyglot.lexical-entries').directive('ggEditLemmaForm', ggEditLemmaForm);

function ggEditLemmaForm() {
    return {
        restrict: 'EA',
        scope: {
            langCode: '=',
            model: '=',
            onSuccess: '&',
        },
        templateUrl: 'lexical-entries/components/edit-lemma-form/template.html',

        controller: function($scope, LexicalEntry) {

            $scope.submit = function() {
                $scope.model.update().then(function() {
                    // Execute callback function
                    $scope.onSuccess();
                }, function(error) {
                    // handle errors
                });
            };
        },
    };
}
