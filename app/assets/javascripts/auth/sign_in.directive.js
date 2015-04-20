angular.module('golyglot.auth').directive('ggSignInForm', ggSignInForm);

function ggSignInForm() {

    SignInCtrl.$inject = ['$scope', '$state', 'auth', '$log'];

    function SignInCtrl($scope, $state, auth, $log) {
        $scope.serverError = null;
        $scope.submitted = false;

        $scope.signIn = function(valid) {
            $scope.submitted = true;

            if (valid) {
                return auth.signIn($scope.user).success(function(result) {
                    $state.go('user.lexicons', {id: $scope.currentUser.id});
                }).error(function(data, status) {
                    $scope.serverError = data.error;
                });
            }
        };
    }

    return {
        restrict: 'EA',
        templateUrl: 'auth/sign_in.html',
        controller: SignInCtrl,
    };
}
