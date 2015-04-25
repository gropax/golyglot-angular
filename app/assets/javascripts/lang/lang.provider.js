angular.module('golyglot.lang').provider('lang', langProvider);

langProvider.$inject = ['$injector', 'LANG_COMPONENTS'];

function langProvider($injector, LANG_COMPONENTS) {

    this.$get = function() {
        return lang;
    };


    var languages = {};

    function lang(langCode) {
        return languages[langCode];
    }


    this.language = function(code, name) {
        return new Language(code, name)
    };

    this.Language = (function(langProvider) {

        var Language = function(code, name) {
            this.code = code;
            this.name = name;

            this.settings = {};
            this.components = {};

            this.registered = false;
        }

        Language.prototype.settings = function(settings) {
            this.settings = $injector.get(settings);

            return this;
        };

        Language.prototype.component = function(name, config) {
            if (angular.isUndefined(config.templateUrl)) {
                throw LanguageError('Template URL required');
            }
            if (!LANG_COMPONENTS[name]) {
                throw LanguageError('Unknown component: ' + name);
            }
            var ctrl = $injector.get(config.controller) || angular.noop;

            this.components[name] = {
                templateUrl: config.templateUrl,
                controller: ctrl,
            };

            return this;
        };

        Language.prototype.defaultRepresentation = function(config) {
            if (!angular.isString(config.script)) {
                throw LanguageError('Invalid script name');
            }
            if (!angular.isString(config.orthographyName)) {
                throw LanguageError('Invalid orthography name');
            }

            this.defaultRepresentation = config;
            return this;
        };

        Language.prototype.register = function() {
            if (angular.isUndefined(this.defaultRepresentation)) {
                throw LanguageError('Default representation required');
            }

            if (!this.registered) {
                langProvider.languages.push(this);
                this.registered = true;
            }
        }


        function LanguageError(message) {
          this.name = 'LanguageError';
          this.message = message;
        }
        LanguageError.prototype = new Error();
        LanguageError.prototype.constructor = LanguageError;


        return Language;

    })(this);
};
