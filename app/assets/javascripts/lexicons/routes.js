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

            controller: ['$scope', 'lexicon', function($scope, lexicon) {
                $scope.lexicon = lexicon;
            }],
        }).

        state('user.lexicon.show', {
            url: '',
            templateUrl: 'lexicons/templates/show.html',
            controller: 'ShowLexiconCtrl',
        });
};

