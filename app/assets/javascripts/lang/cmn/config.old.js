angular.module('golyglot.lang.cmn').config(config);

config.$inject = ['languageServiceProvider', 'languageTemplatesProvider'];

function config(languageServiceProvider, languageTemplatesProvider) {
    var plugin = new languageServiceProvider.LanguagePlugin("cmn", "Mandarin");

    plugin.partials = {
        lemma: "lang/cmn/partials/lemma.html",
        text: "lang/cmn/partials/text.html",
        config: "lang/cmn/partials/config.html",
        textForm: "lang/cmn/partials/text-form.html",
    };

    plugin.defaultConfig = {
        charset: "simplified",
        showPinyin: true,
    };

    languageServiceProvider.registerPlugin(plugin);

    languageTemplatesProvider.register('cmn', {
        lemma: "lang/cmn/partials/lemma.html",
        text: "lang/cmn/partials/text.html",
        config: "lang/cmn/partials/config.html",
        textForm: "lang/cmn/partials/text-form.html",
    });
}
