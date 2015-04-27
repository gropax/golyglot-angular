angular.module('golyglot.lexical-entries').config(config);

config.$inject = ['$stateProvider', 'USER_ROLES'];

function config($stateProvider, USER_ROLES) {

    $stateProvider.
        state('lexicalEntry', {
            parent: 'lexicon',
            url: '/entry/:id',
            templateUrl: 'lexical-entries/template.html',
            controller: 'LexicalEntryCtrl',

            resolve: {
                lexicalEntry: function($stateParams, lexicon, LexicalEntry) {
                    return LexicalEntry.get({id: $stateParams.id, lexiconId: lexicon.id});
                },
            },
        });

};
