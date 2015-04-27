angular.module('golyglot.lang.eng').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('eng', 'English')

        .representation('english', {
            script: 'Latn',
            orthographyName: 'english', // @fixme
        })
        .defaultRepresentation('english')

        .register();
}
