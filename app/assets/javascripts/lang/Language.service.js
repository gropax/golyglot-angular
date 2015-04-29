angular.module('golyglot.lang').factory('Language', LanguageFactory);

LanguageFactory.$inject = ['$injector', 'RepresentationSchema'];

function LanguageFactory($injector, RepresentationSchema) {

    var Language = function(factory) {
        this.factory = factory;

        this.code = factory.code;
        this.name = factory.name;

        if (factory.settingsService) {
            this.settings = $injector.get(factory.settingsService);
        }

        this.components = factory.components;

        this.representations = {};

        var facReprs = factory.representations;
        for (name in facReprs) {
            if (facReprs.hasOwnProperty(name)) {
                var repr = new RepresentationSchema(facReprs[name]);
                this.representations[name] = repr;
            }
        }

        var defReprName = factory.defaultRepresentation;
        this.defaultRepresentation = this.representations[defReprName];
    }

    Language.prototype.component = function(name) {
        return this.components[name];
    };

    Language.prototype.representation = function(name) {
        return this.representations[name];
    };

    return Language;
}
