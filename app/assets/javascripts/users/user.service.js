angular.module('golyglot.users').service('User', User);

User.$inject = ['railsResourceFactory', '$resource'];

function User(railsResourceFactory, $resource) {
    var User = $resource('api/users/:userId');

    return User;
}
