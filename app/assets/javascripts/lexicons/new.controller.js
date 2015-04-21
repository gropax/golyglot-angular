angular.module('golyglot.lexicons').controller('NewLexiconCtrl', NewLexiconCtrl);

NewLexiconCtrl.$inject = ['$scope', 'Lexicon'];

function NewLexiconCtrl($scope, Lexicon) {
    $scope.submit = function(valid) {
        var promise = new Lexicon($scope.lexicon).create();
        promise.success(function() {
            // get lexicon id from response
            // redirect to lexicon page
        }).error(function() {
            // display errors
        });
    };    
}
