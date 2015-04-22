angular.module('golyglot.lexicons').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('newLexicon', {
            url: '/new',
            templateUrl: 'lexicons/templates/new.html',
            controller: 'NewLexiconCtrl',
            data: {
                userRole: USER_ROLES.user,
            },
        }).

        state('user.lexicon', {
            abstract: true,
            url: '/:lexiconName',
            templateUrl: 'lexicons/templates/lexicon.html',

            resolve: {
                lexicon: function($stateParams, user, Lexicon) {
                    return Lexicon.query({name: $stateParams.lexiconName}, {userId: user.id});
                },
            },

            controller: ['$scope', '$state', 'lexicon', function($scope, $state, lexicon) {
                $scope.lexicon = lexicon;
                $scope.tab = function() {
                    return $state.current.name.split('.')[2];
                };
            }],
        }).

        state('user.lexicon.resources', {
            url: '',
            templateUrl: 'lexicons/templates/resources.html',
            //controller: 'LexiconResourcesCtrl',
        }).

        state('user.lexicon.settings', {
            url: '/settings',
            templateUrl: 'lexicons/templates/settings.html',
            controller: 'LexiconSettingsCtrl',
        });
};

