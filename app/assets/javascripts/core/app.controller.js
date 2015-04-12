angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

// Global application controller. Used to store configuration data, such as:
//   - second language
//   - language-specific settings
//
function AppCtrl($scope, $log, languageService) {
    $log.log("AppCtrl initialized !!");

    $scope.langConfig = {cmn: {charStyle: "simplified", showPinyin: true}};
    $scope.secondLanguage = "eng";
};

