angular.module('golyglot.auth').config(function($stateProvider) {

    $stateProvider.
        state('guest', {
            abstract: true,
            template: '<ui-view/>',
        }).
        state('guest.home', {
            url: '/',
            templateUrl: 'home.html',
        }).
        state('guest.sign-up', {
            url: '/sign_up',
            templateUrl: 'auth/sign_up.html',
            controller: 'SignUpCtrl',
        }).
        state('guest.sign-in', {
            url: '/sign_in',
            templateUrl: 'auth/sign_in.html',
            controller: 'SignInCtrl',
        })
});

