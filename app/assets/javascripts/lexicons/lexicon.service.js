angular.module('golyglot.lexicons').service('Lexicon', Lexicon);

Lexicon.$inject = ['$resource'];

function Lexicon($resource) {
    var Lexicon = $resource('api/users/:userId/lexicons/:id');

    return Lexicon;
}
