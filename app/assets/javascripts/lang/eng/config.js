angular.module('golyglot.lang.eng').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('eng', 'English')

        .defaultRepresentation({
            script: 'Latn',
            orthographyName: 'english', // @fixme
        })

        .register();
}
