angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.
        state('lexicalEntries', {
            url: '/lexical_entries',
            templateUrl: 'lexical_entries/list.html',
            controller: 'LexicalEntriesListCtrl'
        }).
        state('lexicalEntry', {
            url: '/lexical_entries/:id',
            templateUrl: 'lexical_entries/show.html',
            controller: 'LexicalEntriesShowCtrl'
        });

    $urlRouterProvider.otherwise('/lexical_entries');

    // What is this ?
    //$locationProvider.html5Mode(true);
});

