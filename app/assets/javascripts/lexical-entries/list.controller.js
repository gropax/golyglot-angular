angular.module('golyglot.lexical-entries').controller('ListLexicalEntriesCtrl', ListLexicalEntriesCtrl);

ListLexicalEntriesCtrl.$inject = ['$scope', '$state', 'lexicon', 'LexicalEntry', 'languageService', '$log'];

function ListLexicalEntriesCtrl($scope, $state, lexicon, LexicalEntry, languageService, $log) {
    $scope.language = languageService.availableLanguages()[0];


    $scope.searchEntries = function() {
        $log.debug("Search: " + $scope.search);
    };

    $scope.searching = true;
    $scope.lexicalEntries = [];

    LexicalEntry.get({lexiconId: lexicon.id}).then(function(result) {
        $scope.lexicalEntries = result;
        $scope.searching = false;
    }, function(error) {
        $scope.searching = false;
        // @todo Handle error
    });


    $scope.lexicalEntry = new LexicalEntry({language: $scope.language.code, lexiconId: lexicon.id});

    $scope.$watch('language', function() {
        $scope.lexicalEntry.language = $scope.language.code;
    });

    $scope.createEntry = function() {
        $scope.lexicalEntry.create().then(function() {
            $('#newEntryModal').modal('hide');
        }, function(error) {
            // handle errors
        });
    };
}
