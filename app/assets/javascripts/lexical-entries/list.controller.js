angular.module('golyglot.lexical-entries').controller('ListLexicalEntriesCtrl', ListLexicalEntriesCtrl);

ListLexicalEntriesCtrl.$inject = ['$scope', '$state', 'LexicalEntry', 'languageService', '$log'];

function ListLexicalEntriesCtrl($scope, $state, LexicalEntry, languageService, $log) {
    $scope.language = languageService.availableLanguages()[0];
    $scope.languageService = languageService;

    $scope.searchEntries = function() {
        $log.debug("Search: " + $scope.search);
    }

    $scope.createEntry = function() {
        $log.debug("Create Entry: " + $scope.lexicalEntry.writtenForm);
        $('#newEntryModal').modal('hide');
    }
}
