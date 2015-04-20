angular.module('golyglot.auth').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];
        
function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('guest', {
            abstract: true,
            template: '<ui-view/>',
            data: {
                userRole: USER_ROLES.guest,
            },
        }).
        state('guest.home', {
            url: '/home',
            templateUrl: 'home.html',
        }).
        state('guest.sign-up', {
            url: '/sign_up',
            templateUrl: 'auth/sign_up.html',
            controller: 'SignUpCtrl',
        });
};
