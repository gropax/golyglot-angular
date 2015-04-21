angular.module('golyglot.lexicons').service('Lexicon', Lexicon);

Lexicon.$inject = ['railsResourceFactory'];

function Lexicon(railsResourceFactory) {
    return railsResourceFactory({
        url: "/api/users/{{userId}}/lexicons/{{id}}",
        name: "lexicon",
    });
}
