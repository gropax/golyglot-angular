angular.module('golyglot.lang.fra').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('fra', 'French')

        .defaultRepresentation({
            script: 'Latn',
            orthographyName: 'french', // @fixme
        })

        .register();
}
