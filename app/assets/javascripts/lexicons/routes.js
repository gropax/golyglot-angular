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
        });
};

