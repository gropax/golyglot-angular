angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

// Global application confis state.
//
// @note
//     Could remove that ctrl and use `$rootscope` instead ?
// 
function AppCtrl($scope, languageService) {
    $scope.secondLanguage = "eng";
};

