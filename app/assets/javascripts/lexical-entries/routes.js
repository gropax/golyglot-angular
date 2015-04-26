angular.module('golyglot.lexicons').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('user.lexicon.resources.lexicalEntries', {
            //url: '/lexical-entries',
            url: '',
            templateUrl: 'lexical-entries/templates/list.html',
            controller: 'ListLexicalEntriesCtrl',
        });
};

