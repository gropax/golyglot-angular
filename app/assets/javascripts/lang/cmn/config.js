angular.module('golyglot.lang.cmn').config(['$provide', function($provide) {
    $provide.decorator('languageService', languageServiceDecorator);
}]);


languageServiceDecorator.$inject = ['$delegate', '$log', 'LanguagePlugin'];

function languageServiceDecorator($delegate, $log, LanguagePlugin) {
    $log.log("Decorator initialized !!");

    var plugin = new LanguagePlugin("cmn");

    plugin.partials = {
        lemma: "lang/cmn/partials/lemma.html",
        text: "lang/cmn/partials/text.html",
        config: "lang/cmn/partials/config.html",
    };

    plugin.defaultConfig = {
        charset: "simplified",
        displayPinYin: true,
    };

    plugin.representations({
        simplified: {script: "Hans"},
        traditional: {script: "Hant"},
        pinyin: {script: "Latn", orthographyName: "pinyin"},
    });

    $delegate.registerPlugin(plugin);

    return $delegate;
}
