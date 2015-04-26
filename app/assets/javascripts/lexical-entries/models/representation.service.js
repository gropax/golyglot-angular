angular.module('golyglot.lexical-entries').service('Representation', Representation);

Representation.$inject = ['railsResourceFactory'];

function Representation(railsResourceFactory) {
    return railsResourceFactory({
        url: "/api/representations/{{id}}",
        name: "representation",
    });
}
