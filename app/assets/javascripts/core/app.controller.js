angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

AppCtrl.$inject = ['$scope', 'languageService', 'auth', 'USER_ROLES'];

function AppCtrl($scope, languageService, auth, USER_ROLES) {
    $scope.secondLanguage = "eng";

    $scope.currentUser = auth.currentUser();

    $scope.setCurrentUser = function (user) {
        $scope.currentUser = user;
    }

    $scope.USER_ROLES = USER_ROLES;
};

