angular.module('golyglot.auth').directive('ggSignInForm', ggSignInForm);

function ggSignInForm() {

    SignInCtrl.$inject = ['$scope', '$state', 'auth'];

    function SignInCtrl($scope, $state, auth) {
        $scope.errors = [];

        $scope.signIn = function() {
            return auth.signIn($scope.user).success(function(result) {
                $state.go('guest.home');
            });        
        };
    }

    return {
        restrict: 'EA',
        templateUrl: 'auth/sign_in.html',
        controller: SignInCtrl,
    };
}
