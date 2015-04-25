angular.module('golyglot.lang.cmn').filter('cmnTraditional', cmnTraditional);

cmnTraditional.$inject = [];

function cmnTraditional() {
    return function(input) {
        var reprs = input ? input.representations || input.representations : false;
        var pinyin = reprs && _.detect(reprs, function(repr) { return repr.script === 'Hant'; });

        return pinyin ? pinyin.writtenForm : null;
    };
}
