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

    lang.all = function() {
        var langArray = [];
        for (var code in languages) {
            if (languages.hasOwnProperty(code)) {
                langArray.push(languages[code]);
            }
        }
        return langArray;
    };


    this.language = function(code, name) {
        return new LanguageFactory(code, name)
    };


    var Language, LanguageFactory;

    Language = (function() {
        
        var Language = function(factory) {
            this.factory = factory;
        }

        Object.defineProperties(Language.prototype, {
            code: { get: function() { return this.factory.code; } },
            name: { get: function() { return this.factory.name; } },
            settings: { get: function() { return this.factory.settings; } },
            defaultRepresentation: { get: function() { return this.factory.defaultRepresentation; } },
        });

        Language.prototype.component = function(name) {
            return this.factory.components[name];
        };

        return Language;

    })();


    LanguageFactory = (function(languages, Language) {

        var LanguageFactory = function(code, name) {
            this.code = code;
            this.name = name;

            this.components = {};

            this.registered = false;
        }

        LanguageFactory.prototype.settings = function(serviceName) {
            this.settings = serviceName;

            return this;
        };

        LanguageFactory.prototype.component = function(name, config) {
            if (angular.isUndefined(config.templateUrl)) {
                throw new LanguageError('Template URL required');
            }
            if (LANG_COMPONENTS.indexOf(name) === -1) {
                throw new LanguageError('Unknown component: ' + name);
            }

            this.components[name] = {
                templateUrl: config.templateUrl,
                controller: config.controller,
            };

            return this;
        };

        LanguageFactory.prototype.defaultRepresentation = function(config) {
            if (!angular.isString(config.script)) {
                throw LanguageError('Invalid script name');
            }
            if (!angular.isString(config.orthographyName)) {
                throw LanguageError('Invalid orthography name');
            }

            this.defaultRepresentation = config;

            return this;
        };

        LanguageFactory.prototype.register = function() {
            if (angular.isUndefined(this.defaultRepresentation)) {
                throw LanguageError('Default representation required');
            }

            if (!this.registered) {
                languages[this.code] = new Language(this);
                this.registered = true;
            }
        }


        function LanguageError(message) {
          this.name = 'LanguageError';
          this.message = message;
        }
        LanguageError.prototype = new Error();
        LanguageError.prototype.constructor = LanguageError;


        return LanguageFactory;

    })(languages, Language);
};
