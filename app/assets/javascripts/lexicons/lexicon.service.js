angular.module('golyglot.lexicons').service('Lexicon', Lexicon);

Lexicon.$inject = ['railsResourceFactory'];

function Lexicon(railsResourceFactory) {
    return railsResourceFactory({
        url: "/api/lexicons/{{id}}",
        name: "lexicon",
    });
}
