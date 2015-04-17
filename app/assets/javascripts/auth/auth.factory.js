angular.module('golyglot.auth').factory('auth', auth);

auth.$inject = ['$http', 'store', 'USER_ROLES'];

function auth($http, store, USER_ROLES) {
    return {
        currentUser: currentUser,
        signIn: signIn,
        signOut: signOut,
        signUp: signUp,
    };

    function currentUser() {
        var auth_token = store.get('auth_token');
        var user;
        if (auth_token) {
            user = auth_token.user;
            user.role = user.admin ? USER_ROLES.admin : USER_ROLES.user;
            delete user.admin;
        } else {
            user = {role: USER_ROLES.guest};
        }
        return user;
    }

    function signIn(creds) {
        var signingIn = $http.post("/auth/sign_in", creds);
        signingIn.success(function(result) {
            store.set('auth_token', result);
        });
        return signingIn;
    }

    function signOut() {
        store.remove('auth_token');
    }

    function signUp(formData) {
        var signingUp = $http.post("/auth/sign_up", formData);
        signingUp.success(function(result) {
            store.set('auth_token', result);
        });
        return signingUp;
    }
}
