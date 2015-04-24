angular.module('golyglot.lexical-entries').controller('ListLexicalEntriesCtrl', ListLexicalEntriesCtrl);

ListLexicalEntriesCtrl.$inject = ['$scope', '$state', 'LexicalEntry', 'languageService', '$log'];

function ListLexicalEntriesCtrl($scope, $state, LexicalEntry, languageService, $log) {
    $scope.language = languageService.availableLanguages()[0];


    $scope.searchEntries = function() {
        $log.debug("Search: " + $scope.search);
    };


    $scope.lexicalEntry = new LexicalEntry({language: $scope.language.code});
    $scope.$watch('language', function() {
        $log.debug("language changed to: " + $scope.language.code);
        $scope.lexicalEntry = new LexicalEntry({language: $scope.language.code});
    });

    //$scope.lexicalEntry = function() {
    //    return new LexicalEntry({language: $scope.language.code});
    //};

    $scope.createEntry = function() {
        $log.debug("Create Entry: " + $scope.lexicalEntry.writtenForm);
        $('#newEntryModal').modal('hide');
    };
}
