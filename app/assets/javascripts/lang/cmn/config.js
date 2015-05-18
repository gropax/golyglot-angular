angular.module('golyglot.lang.cmn').config(config);

config.$inject = ['langProvider'];

function config(langProvider) {
    langProvider.language('cmn', 'Mandarin')

        .representation('simplified', {
            script: 'Hans',
            orthographyName: 'simplified',
        })
        .representation('traditional', {
            script: 'Hant',
            orthographyName: 'traditional',
        })
        .representation('pinyin', {
            script: 'Latn',
            orthographyName: 'pinyin',
        })
        .defaultRepresentation('simplified')

        .settings('cmnSettings')

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
        .component('representableInput', {
            templateUrl: 'lang/cmn/components/representable-input/template.html',
            controller: 'CmnRepresentableInputCtrl',
        })
        .component('settingsPanel', {
            templateUrl: 'lang/cmn/components/settings-panel.html',
            controller: 'CmnCtrl',
        });
}
