angular.module('golyglot.lexical-entries').controller('ListLexicalEntriesCtrl', ListLexicalEntriesCtrl);

ListLexicalEntriesCtrl.$inject = ['$scope', '$state', 'LexicalEntry', '$log'];

function ListLexicalEntriesCtrl($scope, $state, LexicalEntry, $log) {
    $scope.searchEntries = function() {
        $log.debug("Search: " + $scope.search);
    }
}
