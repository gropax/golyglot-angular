angular.module('golyglot.lang.ara').config(config);

config.$inject = ['languageServiceProvider'];

function config(languageServiceProvider) {
    var plugin = new languageServiceProvider.LanguagePlugin("ara", "Arabic");

    plugin.partials = {
        config: "lang/ara/partials/config.html",
    };

    plugin.defaultConfig = {
        showVowels: true,
    };

    languageServiceProvider.registerPlugin(plugin);
}
