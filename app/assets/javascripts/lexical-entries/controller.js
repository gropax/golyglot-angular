angular.module('golyglot.lexical-entries').controller('LexicalEntryCtrl', LexicalEntryCtrl);

LexicalEntryCtrl.$inject = ['$scope', '$state', 'lexicalEntry'];

function LexicalEntryCtrl($scope, $state, lexicalEntry) {
    $scope.lexicalEntry = lexicalEntry;

    $scope.destroy = function() {
        if (confirm('Are you sure ?')) {
            lexicalEntry.destroy().then(function() {
                $state.go('lexicon:lexicalEntries', {language: lexicalEntry.language});
            }, function() {
                // @todo handle errors
            });
        }
    };
}
