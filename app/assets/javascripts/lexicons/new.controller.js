angular.module('golyglot.lexicons').controller('NewLexiconCtrl', NewLexiconCtrl);

NewLexiconCtrl.$inject = ['$scope', '$state', 'Lexicon'];

function NewLexiconCtrl($scope, $state, Lexicon) {
    $scope.submit = function(valid) {
        var promise = new Lexicon($scope.lexicon).create();
        promise.then(function(result) {
            $state.go('lexicon', {userId: result.userId, id: result.id});
            // get lexicon id from response
            // redirect to lexicon page
        }, function() {
            // display errors
        });
    };    
}
