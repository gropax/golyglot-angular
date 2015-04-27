angular.module('golyglot.lang.fra').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('fra', 'French')

        .representation('french', {
            script: 'Latn',
            orthographyName: 'french', // @fixme
        })
        .defaultRepresentation('french')

        .register();
}
