angular.module('golyglot.lexical-entries').factory('LexicalEntry', LexicalEntry);


function LexicalEntry(railsResourceFactory) {
    return railsResourceFactory({
        url: "/lexical_entries/{{id}}",
        name: "lexicalEntry",
    });
}
