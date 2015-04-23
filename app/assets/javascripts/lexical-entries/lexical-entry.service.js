angular.module('golyglot.lexical-entries').factory('LexicalEntry', LexicalEntry);

LexicalEntry.$inject = ['railsResourceFactory'];

function LexicalEntry(railsResourceFactory) {
    return railsResourceFactory({
        url: "/api/lexical_entries/{{id}}",
        name: "lexicalEntry",
    });
}
