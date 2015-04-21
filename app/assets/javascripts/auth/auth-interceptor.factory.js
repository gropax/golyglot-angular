angular.module('golyglot.auth')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$injector', function ($injector) {
            return $injector.get('authInterceptor');
        }]);
    }])
    .factory('authInterceptor', authInterceptor);

authInterceptor.$inject = ['$rootScope', '$q', 'AUTH_EVENTS', 'store'];

function authInterceptor($rootScope, $q, AUTH_EVENTS, store) {
    return {
        request: function(config) {
            var authToken = store.get('auth_token');
            var token = authToken ? authToken.token : null;

            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        },
    };
}
