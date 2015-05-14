angular.module('golyglot.core').config(config);

config.$inject = ['$httpProvider'];

function config($httpProvider) {
    $httpProvider.defaults.headers.common  = {
        'Accept': 'application/json'
    };
}
