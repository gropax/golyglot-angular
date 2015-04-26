angular.module('golyglot').directive('ggGlobalSettingsPanel', ggGlobalSettingsPanel);

ggGlobalSettingsPanel.$inject = ['lang'];

function ggGlobalSettingsPanel(lang) {
    return {
        restrict: 'EA',

        scope: {
            language: "=",
        },

        templateUrl: "components/global-settings-panel/template.html",

        controller: function($scope, lang) {
            $scope.languages = lang.all();
        }
    };
}
