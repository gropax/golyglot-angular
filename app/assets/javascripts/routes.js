angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    //$stateProvider.
    //    state('guest', {
    //        abstract: true,
    //        template: '<ui-view/>',
    //    }).
    //    state('guest.home', {
    //        url: '/',
    //        templateUrl: 'home.html',
    //    }).
    //    state('guest.sign-up', {
    //        url: '/sign_up',
    //        templateUrl: 'auth/sign_up.html',
    //        controller: 'SignUpCtrl',
    //    }).
    //    state('guest.sign-in', {
    //        url: '/sign_in',
    //        templateUrl: 'auth/sign_in.html',
    //        controller: 'SignInCtrl',
    //    })

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

    $urlRouterProvider.otherwise('/home');

    // What is this ?
    $locationProvider.html5Mode(true);
});

