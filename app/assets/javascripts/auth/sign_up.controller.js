angular.module('golyglot.auth').controller('SignUpCtrl', SignUpCtrl);

SignUpCtrl.$inject = ['$scope', '$state', 'auth'];

function SignUpCtrl($scope, $state, auth) {
    $scope.errors = [];

    $scope.$state = $state;

    $scope.signUp = function() {
        return auth.signUp($scope.user).success(function(result) {
            $state.go('guest.home');
        });        
    };
}
