angular.module('golyglot.lang.ara').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('ara', 'Arabic')

        .defaultRepresentation({
            script: 'Arab', // @fixme
            orthographyName: 'arabic', // @fixme
        })

        .component('settingsPanel', {
            templateUrl: 'lang/ara/components/settingsPanel.html',
        })

        .register();
}
