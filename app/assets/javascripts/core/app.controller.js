angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', 'languageService', 'auth', 'USER_ROLES', 'AUTH_EVENTS'];

function AppCtrl($scope, languageService, auth, USER_ROLES, AUTH_EVENTS) {
    $scope.secondLanguage = "eng";

    $scope.currentUser = auth.currentUser();

    angular.forEach([AUTH_EVENTS.signIn, AUTH_EVENTS.signOut], function(vent) {
        $scope.$on(vent, function() {
            $scope.currentUser = auth.currentUser();
        });
    })

    $scope.USER_ROLES = USER_ROLES;
};

