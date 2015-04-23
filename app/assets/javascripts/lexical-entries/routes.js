angular.module('golyglot.lexical-entries').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('user.lexicon.lexicalEntries', {
            url: '/lexical-entries',
            templateUrl: 'lexical-entries/templates/list.html',
            //controller: 'ListLexicalEntriesCtrl',
        });
};

