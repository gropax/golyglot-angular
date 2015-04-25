angular.module('golyglot.lang.cmn').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('cmn', 'Mandarin')

        .defaultRepresentation({
            script: 'Hans',
            orthographyName: 'simplified',
        })

        .component('lemma', {
            templateUrl: 'lang/cmn/components/lemma.html',
            controller: 'CmnCtrl',
        })
        .component('text', {
            templateUrl: 'lang/cmn/components/text.html',
            controller: 'CmnCtrl',
        })
        .component('textForm', {
            templateUrl: 'lang/cmn/components/text-form/template.html',
            controller: 'CmnTextFormCtrl',
        })
        .component('settingsPanel', {
            templateUrl: 'lang/cmn/components/settings-panel.html',
            controller: 'CmnCtrl',
        })

        .settings('cmnSettings')

        .register()
}
