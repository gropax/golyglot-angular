angular.module('golyglot.lang.cmn').filter('cmnPinyin', cmnPinyin);

cmnPinyin.$inject = [];

function cmnPinyin() {
    return function(input) {
        var reprs = input ? input.representations || input.representations : false;
        var pinyin = reprs && _.detect(reprs.toArray(), function(repr) { return repr.orthographyName === 'pinyin'; });

        return pinyin ? pinyin.writtenForm : null;
    };
}
