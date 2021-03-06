angular.module('golyglot.auth')
    .constant('USER_ROLES', {
        admin: 2,
        user: 1,
        guest: 0,
    })
    .constant('AUTH_EVENTS', {
        signedIn: 'auth:signed:in',
        signedOut: 'auth:signed:out',
        unauthorized: 'auth:unauthorized',
        forbidden: 'auth:forbidden',
    });
