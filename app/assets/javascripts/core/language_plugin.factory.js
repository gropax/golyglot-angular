angular.module('golyglot.core').factory('LanguagePlugin', LanguagePluginFactory); 


function LanguagePluginFactory($log, _) {
    
    function LanguagePlugin(code) {
        this.code = code; // Add language code validation ?

        this.partials = {};
        this.defaultConfig = {};
        this.representationGetters = {};
    }

    LanguagePlugin.prototype.representations = representations;
    // private
    LanguagePlugin.prototype.detectRepresentation = detectRepresentation;

    return LanguagePlugin;


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

    function detectRepresentation2(reprs, attrs) {
        var matchedRepr, fail;

        for (var i = 0; i < reprs.length; i++) {
            var repr = reprs[i];
            
            for (var key in attrs) {
                if (attrs.hasOwnProperty(key) && repr[key] !== attrs[key]) {
                    fail = true;
                    break;
                }
            }
            if (fail === true) {
                matchedRepr = repr;
                break;
            }
        }
        return matchedRepr || false;
    }
};
