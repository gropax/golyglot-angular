angular.module('golyglot').directive('ggSettingsPanels', ggSettingsPanels);

function ggSettingsPanels() {
    return {
        restrict: 'EA',

        scope: {
            firstLanguage: "=",
            secondLanguage: "=",
        },

        templateUrl: "components/settings-panels/template.html",
    };
}
