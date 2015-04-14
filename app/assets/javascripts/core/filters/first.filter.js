angular.module('golyglot.core').filter('first', first);

first.$inject = [];

function first() {
    return function(input) {
        return input[0];
    };
}
