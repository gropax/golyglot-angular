angular.module('golyglot.lang.cmn').filter('cmnSimplified', cmnSimplified);

cmnSimplified.$inject = [];

function cmnSimplified() {
    return function(input) {
        var reprs = input ? input.formRepresentations || input.textRepresentations : false;
        var pinyin = reprs && _.detect(reprs, function(repr) { return repr.script === 'Hans'; });

        return pinyin ? pinyin.writtenForm : null;
    };
}
