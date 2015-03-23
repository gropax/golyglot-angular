
angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.
        state('lexical_entries', {
            url: '/lexical_entries',
            templateUrl: 'lexical_entries.html',
            controller: 'LexicalEntriesCtrl'
        }).
        state('lexical_entry', {
            url: '/lexical_entry/:id',
            templateUrl: 'lexical_entry.html',
            controller: 'LexicalEntryCtrl'
        });

    $urlRouterProvider.otherwise('/lexical_entry/1');

    // What is this ?
    //$locationProvider.html5Mode(true);
});

