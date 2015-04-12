angular.module('golyglot.core').service('languageService', languageService);


function languageService($log, _) {
    $log.log("LanguageService initialized !!");

    this.plugins = {};
    this.registerPlugin = registerPlugin;
    this.importHelpersIn = importHelpersIn;
    this.partial = partial;


    function partial(lang, name) {
        var plugin = this.plugins[lang];
        var partial = plugin && plugin.partials[name];
        partial = partial || "core/partials/" + name;

        return partial;
    }

    function registerPlugin(plugin) {
        if (this.plugins[plugin.code])
            throws("Plugin already register for language: " + plugin.code);

        this.plugins[plugin.code] = plugin;

        return true;
    }

    function importHelpersIn($scope) {
        var lang = $scope.language,
            form = $scope.form,
            config = $scope.config;

        var plugin = this.plugins[lang];
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


    function fetchPlugin(code) {
        var plugin = this.plugins[code];
        if (plugin)
            return plugin
        else
            throws("No plugin registered for language: " + code);
    }
}
