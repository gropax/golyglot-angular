angular.module('golyglot.core').provider('languageService', languageServiceProvider);

languageServiceProvider.$inject = ["defaultPartials"];
        
function languageServiceProvider(defaultPartials) {

    // Language plugins creation and registering
    // -----------------------------------------
    
    var registeredPlugins = {};

    // Register a Language plugin
    //
    this.registerPlugin = function registerPlugin(plugin) {
        if (registeredPlugins[plugin.code])
            throw("Plugin already registered for language: " + plugin.code);

        registeredPlugins[plugin.code] = plugin;

        return true;
    };

    // Provide a constructor to create a new language plugin
    //
    this.LanguagePlugin = (function() {
        var LanguagePlugin = function(code, name) {
            this.code = code; // Add language code validation ?
            this.name = name;

            this.partials = {};
            this.defaultConfig = {};
            this.representationGetters = {};
        }

        LanguagePlugin.prototype.representations = representations;
        LanguagePlugin.prototype.detectRepresentation = detectRepresentation;

        function representations(attrs) {
            var getters = _.mapObject(attrs, function(val, key) {
                return function(reprs) {
                    return detectRepresentation(reprs, val);
                };
            });
            this.representationGetters = getters;

            return getters;
        }

        function detectRepresentation(reprs, attrs) {
            return _.detect(reprs, function(repr) {
                return _.all(_.keys(attrs), function(key) { return repr[key] === attrs[key]; });
            });
        }

        return LanguagePlugin;
    })();
        



    // languageService instances properties
    // ------------------------------------

    this.$get = function() {
        return {
            //registeredPlugins: registeredPlugins,
            availableLanguages: availableLanguages,
            defaultConfig: defaultConfig,
            importHelpersIn: importHelpersIn,
            representations: representations,
            partial: partial,
        };
    };

    function partial(lang, name) {
        var plugin = registeredPlugins[lang];
        var partial = plugin && plugin.partials[name];

        return partial || defaultPartials[name] || false;
    }

    function importHelpersIn($scope) {
        var lang = $scope.language,
            form = $scope.form,
            config = $scope.config;

        var plugin = registeredPlugins[lang];
        var getters = plugin.representationGetters;

        var helpers = _.mapObject(getters, function(getter, key) {
            return function() {
                var reprs = form.formRepresentations || form.textRepresentations;
                var repr = getter(reprs);

                return repr && repr.writtenForm;
            };
        });
        _.extend($scope, helpers);

        return helpers;
    }

    function representations(lang, reprs) {
        var plugin = registeredPlugins[lang];

        var getters = plugin ? plugin.representationGetters : {};
        // Add the default getter (which just pick the first representation)
        getters.default = function(reprs) { return reprs[0]; };

        return _.mapObject(getters, function(getter, key) {
            return function() {
                var repr = getter(reprs);
                return repr && repr.writtenForm;
            };
        });
    }

    function defaultConfig() {
        return _.mapObject(registeredPlugins, function(plugin, code) {
            return plugin.defaultConfig; 
        });
    }

    function availableLanguages() {
        return _.map(registeredPlugins, function(plugin) {
            return {code: plugin.code, name: plugin.name};
        });
    }

};
