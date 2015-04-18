angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', 'languageService', 'auth', 'USER_ROLES', 'AUTH_EVENTS'];

function AppCtrl($scope, languageService, auth, USER_ROLES, AUTH_EVENTS) {
    $scope.secondLanguage = "eng";

    $scope.currentUser = auth.currentUser();

    $scope.$on(AUTH_EVENTS.signUpSuccess, function() {
        $scope.currentUser = auth.currentUser();
    });

    $scope.USER_ROLES = USER_ROLES;
};

