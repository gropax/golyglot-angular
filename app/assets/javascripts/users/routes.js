angular.module('golyglot.users').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('user', {
            abstract: true,
            url: '/:username',
            template: '<ui-view/>',

            // Automatically fetch `user` from its `name`
            resolve: {
                user: ['$stateParams', 'User', function($stateParams, User) {
                    return User.query({name: $stateParams.username});
                }],
            },

            // Makes the `user` object accessible to all sub-states
            controller: ['$scope', 'user', function($scope, user) {
                $scope.user = user;
            }],

            data: {
                userRole: USER_ROLES.user,
            },
        }).

        state('user:settings', {
            parent: 'user',
            url: '/settings',
            templateUrl: 'users/settings/template.html',
            //controller: 'UserSettingsCtrl',
        }).

        state('user:resources', {
            parent: 'user',
            abstract: true,
            templateUrl: 'users/resources/template.html',
        }).

        state('user:lexicons', {
            parent: 'user:resources',
            url: '',
            templateUrl: 'users/lexicons/template.html',
            controller: 'UserLexiconsCtrl',
        });
};

