angular.module('golyglot.lexical-entries').controller('LexicalEntryCtrl', LexicalEntryCtrl);

LexicalEntryCtrl.$inject = ['$scope', 'lexicalEntry'];

function LexicalEntryCtrl($scope, lexicalEntry) {
    $scope.lexicalEntry = lexicalEntry;
    
    $scope.onLemmaUpdated = function() {
        $('#editLemmaModel').modal('hide');
    };
}
