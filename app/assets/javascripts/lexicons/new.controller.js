angular.module('golyglot.lexicons').controller('NewLexiconCtrl', NewLexiconCtrl);

NewLexiconCtrl.$inject = ['$scope', '$state', 'Lexicon'];

function NewLexiconCtrl($scope, $state, Lexicon) {
    $scope.submit = function(valid) {
        var promise = new Lexicon($scope.lexicon).create();
        promise.then(function(lexicon) {
            $state.go('user.lexicon.resources', {username: $scope.currentUser.name, lexiconName: lexicon.name});
        }, function() {
            // display errors
        });
    };    
}
