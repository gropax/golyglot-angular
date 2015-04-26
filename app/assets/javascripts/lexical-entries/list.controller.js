angular.module('golyglot.lexical-entries').controller('ListLexicalEntriesCtrl', ListLexicalEntriesCtrl);

ListLexicalEntriesCtrl.$inject = ['$scope', 'lexicon', 'LexicalEntry', 'lang', '$log'];

function ListLexicalEntriesCtrl($scope, lexicon, LexicalEntry, lang, $log) {

    // Initialize value of language selector
    //
    // @todo
    //     Add a 'main language' attribute in lexicons, which would be the
    //     default language
    //
    $scope.language = lang.all()[0];


    $scope.onEntryCreated = function() {
        $('#newEntryModal').modal('hide');
        displayRecentEntries();
    };

    $scope.listTitle = 'Added Recently';
    $scope.lexicalEntries = [];

    // Display recent entries when the user changes the language
    //
    $scope.$watch('language', function() {
        displayRecentEntries();
    });

    function displayRecentEntries() {
        $scope.searching = true;
        LexicalEntry.get({lexiconId: lexicon.id}, {language: $scope.language.code}).then(function(result) {
            $scope.lexicalEntries = result;
            $scope.listTitle = 'Added Recently';

            $scope.searching = false;
        }, function(error) {
            $scope.searching = false;
            // @todo Handle error
        });
    }

    // Send a search request and display the results when the user click on the
    // search button.
    //
    $scope.searchEntries = function() {
        $log.debug("Search: " + $scope.search);

        $scope.listTitle = 'Results for: ' + $scope.search;
        $scope.lexicalEntries = [];

        //$scope.searching = true;
        //LexicalEntry.search({query: $scope.search}).then(function(result) {
        //    $scope.lexicalEntries = result;
        //    $scope.listTitle = 'Results for: ' + $scope.search;

        //    $scope.searching = false;
        //}, function(error) {
        //    $scope.searching = false;
        //    // @todo Handle error
        //});
    };

}
