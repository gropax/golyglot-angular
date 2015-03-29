angular.module('golyglot').controller('LexicalEntriesCtrl', LexicalEntriesCtrl);

function LexicalEntriesCtrl($scope, LexicalEntry) {
    $scope.searching = true;
    $scope.lexicalEntries = [];

    LexicalEntry.query().then(function (results) {
        $scope.lexicalEntries = results;
        $scope.searching = false;
    }, function (error) {
        $scope.searching = false;
    });
};

