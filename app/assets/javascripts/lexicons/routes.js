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
                $scope.lexiconTab = function() {
                    return $state.current.name.split('.')[2];
                };
            }],
        }).

        state('user.lexicon.settings', {
            url: '/settings',
            templateUrl: 'lexicons/templates/settings.html',
            controller: 'LexiconSettingsCtrl',
        }).

        state('user.lexicon.resources', {
            abstract: true,
            url: '',
            templateUrl: 'lexicons/templates/resources.html',

            controller: ['$scope', '$state', function($scope, $state) {
                $scope.resourcesTab = function() {
                    return $state.current.name.split('.')[3];
                };
            }],
        }).

        state('user.lexicon.resources.lexicalEntries', {
            url: '/lexical-entries',
            templateUrl: 'lexical-entries/templates/list.html',
            //controller: 'ListLexicalEntriesCtrl',
        }).

        state('user.lexicon.resources.sentences', {
            url: '/sentences',
            templateUrl: 'sentences/templates/list.html',
            //controller: 'ListSentencesCtrl',
        });
};

