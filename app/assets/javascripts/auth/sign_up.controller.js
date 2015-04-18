angular.module('golyglot.auth').controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$scope', '$rootScope', '$state', 'auth', 'AUTH_EVENTS'];

function SignUpCtrl($scope, $rootScope, $state, auth, AUTH_EVENTS) {
    $scope.errors = [];

    $scope.signUp = function() {
        return auth.signUp($scope.user).success(function(result) {
            $state.go('guest.home');
        });        
    };
}
