angular.module('golyglot.lang').directive('ggLangSettingsPanel', ggLangSettingsPanel);

function ggLangSettingsPanel() {
    return {
        restrict: 'EA',
        scope: {
            langCode: "=",
        },
        templateUrl: "lang/components/settingsPanel/template.html",

        controller: function($scope, lang) {
            $scope.langName = lang($scope.langCode).name;
            $scope.langComp = lang($scope.langCode).component('settingsPanel');
        }
    };
}
