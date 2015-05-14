angular.module('golyglot.lexicons').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        // What state name ? Not under `user` state: create new lexicon for **currentUser**
        //
        state('newLexicon', {
            url: '/new',
            templateUrl: 'lexicons/new/template.html',
            controller: 'NewLexiconCtrl',
            data: {
                userRole: USER_ROLES.user,
            },
        }).

        state('lexicon', {
            parent: 'user',
            abstract: true,
            url: '/:lexiconName',
            templateUrl: 'lexicons/lexicon.html', // @fixme Feels strange

            resolve: {
                lexicon: function($stateParams, user, Lexicon) {
                    var lexicon = Lexicon.get({userId: user.id, name: $stateParams.lexiconName});
                    return lexicon.$promise;
                },
            },

            controller: ['$scope', '$state', 'lexicon', function($scope, $state, lexicon) {
                $scope.lexicon = lexicon;
                $scope.lexiconTab = function() {
                    return $state.current.name.split('.')[2];
                };
            }],
        }).

        state('lexicon:settings', {
            parent: 'lexicon',
            url: '/settings',
            templateUrl: 'lexicons/settings/template.html',
            controller: 'LexiconSettingsCtrl',
        }).

        state('lexicon:resources', {
            parent: 'lexicon',
            abstract: true,
            url: '',
            templateUrl: 'lexicons/resources/template.html',

            controller: ['$scope', '$state', function($scope, $state) {
                $scope.resourcesTab = function() {
                    return $state.current.name.split('.')[3];
                };
            }],
        }).

        state('lexicon:lexicalEntries', {
            parent: 'lexicon:resources',
            url: '',
            templateUrl: 'lexicons/lexical-entries/template.html',
            controller: 'LexiconLexicalEntriesCtrl',
        });

        //state('user.lexicon.resources.sentences', {
        //    url: '/sentences',
        //    templateUrl: 'sentences/templates/list.html',
        //    //controller: 'ListSentencesCtrl',
        //});
};

