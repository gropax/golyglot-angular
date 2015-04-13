angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

// Global application controller. Used to store configuration data, such as:
//   - second language
//   - language-specific settings
//
function AppCtrl($scope, languageService) {
    $scope.langConfig = languageService.defaultConfig();
    $scope.secondLanguage = "eng";
};

