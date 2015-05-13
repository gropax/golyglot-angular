angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', 'auth', 'USER_ROLES', 'AUTH_EVENTS'];

function AppCtrl($scope, auth, USER_ROLES, AUTH_EVENTS) {
    $scope.secondLanguage = "eng";

    $scope.currentUser = auth.currentUser();

    angular.forEach([AUTH_EVENTS.signIn, AUTH_EVENTS.signOut], function(vent) {
        $scope.$on(vent, function() {
            $scope.currentUser = auth.currentUser();
        });
    })

    // @fixme
    //     Manual debugging... problem to spyOn $rootScope.$broadcast in tests
    //
    angular.forEach(AUTH_EVENTS, function(event) {
        $scope.$on(event, function() {
            //$log.debug(event);
        });
    });

    $scope.USER_ROLES = USER_ROLES;
};

