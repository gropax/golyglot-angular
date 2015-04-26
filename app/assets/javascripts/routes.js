angular.module('golyglot').config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/home');

    // Activate HTML5 mode. Allow to get rid of the '#' sign in the url.
    //
    $locationProvider.html5Mode(true);
});

