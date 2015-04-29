angular.module('golyglot.lang').provider('lang', langProvider);

langProvider.$inject = ['$injector', 'LANG_COMPONENTS'];

function langProvider($injector, LANG_COMPONENTS) {

    var languageFactories = {};

    this.language = function(code, name) {
        var factory = new LanguageFactory(code, name);
        languageFactories[code] = factory;

        return factory;
    };

    var LanguageFactory = (function() {
        var LanguageFactory = function(code, name) {
            this.code = code;
            this.name = name;

            this.components = {};
            this.representations = {};

            this.registered = false;
        }

        LanguageFactory.prototype.settings = function(serviceName) {
            this.settingsService = serviceName;

            return this;
        };

        LanguageFactory.prototype.component = function(name, config) {
            if (angular.isUndefined(config.templateUrl)) {
                throw new LanguageError('Template URL required');
            }
            if (LANG_COMPONENTS.indexOf(name) === -1) {
                throw new LanguageError('Unknown component: ' + name);
            }

            this.components[name] = config;

            return this;
        };

        LanguageFactory.prototype.representation = function(name, config) {
            if (!angular.isString(name)) {
                throw LanguageError('Representation name required');
            }
            if (!angular.isString(config.script)) {
                throw LanguageError('Invalid script name');
            }
            if (!angular.isString(config.orthographyName)) {
                throw LanguageError('Invalid orthography name');
            }

            this.representations[name] = config;

            return this;
        }

        LanguageFactory.prototype.defaultRepresentation = function(name) {
            this.defaultRepresentation = name;

            return this;
        };


        function LanguageError(message) {
          this.name = 'LanguageError';
          this.message = message;
        }
        LanguageError.prototype = new Error();
        LanguageError.prototype.constructor = LanguageError;


        return LanguageFactory;
    })();


    this.$get = ['Language', function(Language) {

        var languages = {},
            languageArray = [];

        for (var code in languageFactories) {
            if (languageFactories.hasOwnProperty(code)) {
                var language = new Language(languageFactories[code]);

                languages[code] = language;
                languageArray.push(language);
            }
        }

        function lang(langCode) {
            return languages[langCode];
        }

        lang.all = function() {
            return languageArray;
        };

        return lang;
    }];

};
