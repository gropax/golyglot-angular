angular.module('golyglot.users').service('User', User);

User.$inject = ['railsResourceFactory'];

function User(railsResourceFactory) {
    return railsResourceFactory({
        url: "/api/users/{{id}}",
        name: "user",
    });
}
