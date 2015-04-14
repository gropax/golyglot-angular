angular.module('golyglot.lexical-entries').controller('LexicalEntriesListCtrl', LexicalEntriesListCtrl);

function LexicalEntriesListCtrl($scope, LexicalEntry) {
    $scope.searching = true;
    $scope.lexicalEntries = [];

    LexicalEntry.query().then(function (results) {
        $scope.lexicalEntries = results;
        $scope.searching = false;
    }, function (error) {
        $scope.searching = false;
    });
};

