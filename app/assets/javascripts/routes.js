
angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.
        state('lexicalEntries', {
            url: '/lexical_entries',
            templateUrl: 'lexical_entries/lexical_entries.html',
            controller: 'LexicalEntriesCtrl'
        }).
        state('lexicalEntry', {
            url: '/lexical_entries/:id',
            templateUrl: 'lexical_entries/lexical_entry.html',
            controller: 'LexicalEntryCtrl'
        });

    $urlRouterProvider.otherwise('/lexical_entries');

    // What is this ?
    //$locationProvider.html5Mode(true);
});

