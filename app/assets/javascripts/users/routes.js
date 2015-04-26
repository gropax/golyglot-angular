angular.module('golyglot.users').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('user', {
            abstract: true,
            url: '/:username',
            template: '<ui-view/>',

            // Automatically fetch user data from username
            resolve: {
                user: ['$stateParams', 'User', function($stateParams, User) {
                    return User.query({name: $stateParams.username});
                }],
            },

            // Makes the user data accessible to all sub-states
            controller: ['$scope', 'user', function($scope, user) {
                $scope.user = user;
            }],

            data: {
                userRole: USER_ROLES.user,
            },
        }).

        state('user.home', {
            abstract: true,
            templateUrl: 'users/templates/user.html',
        }).

        state('user.home.lexicons', {
            url: '',
            templateUrl: 'users/templates/user-lexicons.html',
            controller: 'UserLexiconsCtrl',
        });
};

