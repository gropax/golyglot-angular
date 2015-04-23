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
            get: get,
        };
    };

    var templates = {
        lemma: 'core/partials/lemma.html',
        text: 'core/partials/text.html',
        textForm: 'core/partials/text-form.html',
        config: false,
    };

    function get(tempName, langCode) {
        checkIsValidLanguageCode(langCode);
        checkIsValidTemplateName(tempName);

        var langTemplates = languages[langCode];
        var langTempUrl = langTemplates && langTemplates[tempName];

        var tempUrl = langTempUrl || templates[tempName] || false;
        return tempUrl;
    }

    // Language Code Validation
    //
    function checkIsValidLanguageCode(param) {
        if (!angular.isString(param) && param.length !== 3) {
            throw new LanguageCodeError('Invalid language code: ' + param.toString());
        }
    }

    function LanguageCodeError(message) {
      this.name = 'LanguageCodeError';
      this.message= message;
    }
    LanguageCodeError.prototype = new Error();
    LanguageCodeError.prototype.constructor = LanguageCodeError;


    // Template Name Validations
    //
    function checkIsValidTemplateName(param) {
        if (templates[param] === undefined) {
            throw new TemplateNameError('Invalid template name: ' + param.toString());
        }
    }

    function TemplateNameError(message) {
      this.name = 'TemplateNameError';
      this.message= message;
    }
    TemplateNameError.prototype = new Error();
    TemplateNameError.prototype.constructor = TemplateNameError;

};
