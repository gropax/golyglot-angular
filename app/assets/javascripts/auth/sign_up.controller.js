angular.module('golyglot.auth').controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$scope', '$rootScope', '$state', 'auth', 'AUTH_EVENTS', "$log"];

function SignUpCtrl($scope, $rootScope, $state, auth, AUTH_EVENTS, $log) {
    $scope.serverErrors = [];
    $scope.submitted = false;

    $scope.signUp = function(valid) {
        $scope.submitted = true;

        if (valid) {
            return auth.signUp($scope.user).success(function(result) {
                $state.go('guest.home');
            }).error(function(data, status) {
                $scope.serverErrors = data.errors;
            });        
        }
    };
}
