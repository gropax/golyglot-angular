angular.module('golyglot.auth').run(run);

run.$inject = ['$rootScope', '$state', 'auth', 'AUTH_EVENTS', '$log'];

function run($rootScope, $state, auth, AUTH_EVENTS, $log) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (!auth.authorize(toState.data.userRole)) {
            event.preventDefault();

            $state.go('guest.home');
        }
    });
}
