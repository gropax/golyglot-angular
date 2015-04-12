angular.module('golyglot.lang.eng').config(config);

config.$inject = ['languageServiceProvider'];

function config(languageServiceProvider) {
    var plugin = new languageServiceProvider.LanguagePlugin("eng", "English");

    languageServiceProvider.registerPlugin(plugin);
}
