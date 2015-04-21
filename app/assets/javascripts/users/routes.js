angular.module('golyglot.users').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('user', {
            abstract: true,
            templateUrl: 'users/templates/user.html',
            data: {
                userRole: USER_ROLES.user,
            },
        }).
        state('user.lexicons', {
            url: '/user/{id}/lexicons',
            templateUrl: 'users/templates/user-lexicons.html',
            controller: 'UserLexiconsCtrl',
        });
};

