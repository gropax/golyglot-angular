angular.module('golyglot.lang.ara').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('ara', 'Arabic')

        .representation('arabic', {
            script: 'Arab', // @fixme
            orthographyName: 'arabic', // @fixme
        })
        .defaultRepresentation('arabic')

        .component('settingsPanel', {
            templateUrl: 'lang/ara/components/settingsPanel.html',
        })

        .register();
}
