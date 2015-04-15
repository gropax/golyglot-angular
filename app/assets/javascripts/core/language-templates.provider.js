angular.module('golyglot.core').provider('languageTemplates', languageTemplatesProvider);

languageTemplatesProvider.$inject = [];

function languageTemplatesProvider() {

    var languages = {};

    this.register = function register(lang, templates) {
        var prev = languages[lang] || {};
        languages[lang] = _.extend(prev, templates);
    }

    this.$get = function() {
        return {
            
        };
    };
};
