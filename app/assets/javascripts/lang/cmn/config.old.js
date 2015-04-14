angular.module('golyglot.lang.cmn').config(config);

config.$inject = ['languageServiceProvider'];

function config(languageServiceProvider) {
    var plugin = new languageServiceProvider.LanguagePlugin("cmn", "Mandarin");

    plugin.partials = {
        lemma: "lang/cmn/partials/lemma.html",
        text: "lang/cmn/partials/text.html",
        config: "lang/cmn/partials/config.html",
    };

    plugin.defaultConfig = {
        charset: "simplified",
        showPinyin: true,
    };

    languageServiceProvider.registerPlugin(plugin);
}
