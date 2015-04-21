angular.module('golyglot.lexicons').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('newLexicon', {
            url: '/lexicons/new',
            templateUrl: 'lexicons/templates/new.html',
            controller: 'NewLexiconCtrl',
            data: {
                userRole: USER_ROLES.user,
            },
        }).
        state('lexicon', {
            url: '/users/{userId}/lexicons/{id}',
            templateUrl: 'lexicons/templates/show.html',
            controller: 'ShowLexiconCtrl',
            data: {
                userRole: USER_ROLES.user,
            },
        });
};

