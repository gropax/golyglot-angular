angular.module('golyglot.lang.fra').config(config);

config.$inject = ['languageServiceProvider'];

function config(languageServiceProvider) {
    var plugin = new languageServiceProvider.LanguagePlugin("fra", "French");

    languageServiceProvider.registerPlugin(plugin);
}
