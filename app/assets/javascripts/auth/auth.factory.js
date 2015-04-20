angular.module('golyglot.auth').factory('auth', auth);

auth.$inject = ['$rootScope', '$http', 'store', 'USER_ROLES', 'AUTH_EVENTS'];

function auth($rootScope, $http, store, USER_ROLES, AUTH_EVENTS) {
    return {
        authorize: authorize,
        authenticated: authenticated,
        currentUser: currentUser,
        signIn: signIn,
        signOut: signOut,
        signUp: signUp,
    };

    function authorize(userRole) {
        return (currentUser().role >= userRole);
    }

    function authenticated() {
        return !!store.get('auth_token');
    }

    function currentUser() {
        var auth_token = store.get('auth_token');
        var user;
        if (auth_token && auth_token.user) { // @fixme &&
            user = auth_token.user;
            user.role = user.admin ? USER_ROLES.admin : USER_ROLES.user;
            delete user.admin;
        } else {
            user = {role: USER_ROLES.guest};
        }
        return user;
    }

    function signIn(creds) {
        var signingIn = $http.post("/auth/sign_in.json", creds);
        signingIn.success(function(result) {
            store.set('auth_token', result);
            $rootScope.$broadcast(AUTH_EVENTS.signIn);
        });
        return signingIn;
    }

    function signOut() {
        store.remove('auth_token');
        $rootScope.$broadcast(AUTH_EVENTS.signOut);
    }

    function signUp(formData) {
        var signingUp = $http.post("/auth/sign_up.json", formData);
        signingUp.success(function(result) {
            store.set('auth_token', result);
            // Sign user in on successful registering
            $rootScope.$broadcast(AUTH_EVENTS.signIn);
        });
        return signingUp;
    }
}
