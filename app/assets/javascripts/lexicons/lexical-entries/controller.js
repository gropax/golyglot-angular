angular.module('golyglot.lexicons').controller('LexiconLexicalEntriesCtrl', LexiconLexicalEntriesCtrl);

LexiconLexicalEntriesCtrl.$inject = ['$scope', '$state', '$stateParams', 'lexicon', 'lang', 'LexicalEntry', '$log'];

function LexiconLexicalEntriesCtrl($scope, $state, $stateParams, lexicon, lang, LexicalEntry, $log) {

    var language = lang($stateParams.lang) || lang.all()[0];
    $scope.language = language;
    $scope.query = $stateParams.query;


    $scope.lexicalEntries = [];
    $scope.searching = true;

    fetchLexicalEntries();

    resetLexicalEntry();

    $scope.onEntryCreated = function() {
        //$('#newEntryModal').modal('hide');
        resetLexicalEntry();
        //displayRecentEntries();
        if ($stateParams.query)
            $state.go('lexicon:lexicalEntries', {lang: language.code, query: null});
        else
            fetchLexicalEntries();
    };

    $scope.onLanguageSelected = function(language) {
        $state.go('lexicon:lexicalEntries', {lang: language.code, query: null});
    };

    $scope.search = function() {
        $state.go('lexicon:lexicalEntries', {lang: language.code, query: $scope.query})
    };


    function fetchLexicalEntries() {
        var queryParams = {language: $scope.language.code};

        if ($stateParams.query) {
            // Display search results
            $scope.listTitle = 'Results for search: "' + $scope.query + '"';
            queryParams.query = $stateParams.query;
        } else {
            // Display recently added
            $scope.listTitle = 'Recently added';
        }

        LexicalEntry.query({lexiconId: lexicon.id}, queryParams).then(function(result) {
            $scope.lexicalEntries = result;
            $scope.searching = false;
        }, function(error) {
            $scope.searching = false;
            // @todo Handle error
        });
    }

    function resetLexicalEntry() {
        $scope.lexicalEntry = new LexicalEntry({language: language.code, lexiconId: lexicon.id});
    }

}
