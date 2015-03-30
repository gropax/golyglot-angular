angular.module('golyglot.core').service('langComps', langComps);

// Module providing a single interface to access language-specific component
// variants, given the corresponding language code.
//
function langComps(stdComps, cmnComps, engComps) {

    this.definitionTemplateUrl = componentGetter("definition");
    this.equivalentTemplateUrl = componentGetter("equivalent");
    this.lemmaTemplateUrl = componentGetter("lemma");
    this.sentenceTemplateUrl = componentGetter("sentence");
    this.configTemplateUrl = componentGetter("config");


    var compServices = {
        cmn: cmnComps,
        eng: engComps,
    }

    function componentGetter(compName) {
        return function(lang) {
            // Select the right language-specific components provider service,
            // or standard if unknown language.
            var compService = compServices[lang] || stdComps;

            // Look for the component's template url in that service.
            var attr = compName + "TemplateUrl";
            var templateUrl = compService[attr];

            // If the template url is not found in the service, check in the
            // standard service.
            if (templateUrl === undefined && compService !== stdComps) {
                templateUrl = stdComps[attr];
            }

            return templateUrl;
        };
    }
}
