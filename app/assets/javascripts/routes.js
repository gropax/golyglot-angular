angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$stateProvider.
    //    state('lexicalEntries', {
    //        url: '/lexical_entries',
    //        templateUrl: 'lexical_entries/list.html',
    //        controller: 'LexicalEntriesListCtrl'
    //    }).
    //    state('lexicalEntry', {
    //        url: '/lexical_entries/:id',
    //        templateUrl: 'lexical_entries/show.html',
    //        controller: 'LexicalEntriesShowCtrl'
    //    });

    $urlRouterProvider.otherwise('/home');

    // Activate HTML5 mode. Allow to get rid of the '#' sign in the url.
    //
    $locationProvider.html5Mode(true);
});

