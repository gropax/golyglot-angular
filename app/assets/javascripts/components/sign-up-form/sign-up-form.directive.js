angular.module('golyglot.auth').directive('ggSignUpForm', ggSignUpForm);

function ggSignUpForm() {

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

    return {
        restrict: 'EA',
        templateUrl: 'components/sign-up-form/sign-up-form.html',
        controller: SignUpCtrl,
    };
}
