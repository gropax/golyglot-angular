angular.module('golyglot.header').controller('HeaderCtrl', HeaderCtrl);

HeaderCtrl.$inject = ['$scope', '$state', 'auth'];

function HeaderCtrl($scope, $state, auth) {
    $scope.signOut = function() {
        auth.signOut();

        $state.go('guest.home');
    }
}
