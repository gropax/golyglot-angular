angular.module('golyglot.core').controller('AppCtrl', AppCtrl);

function AppCtrl($scope, cmnConfig) {
    $scope.langConfig = {cmn: {charStyle: "simplified", showPinyin: true}};
    $scope.secondLanguage = "eng";
};

