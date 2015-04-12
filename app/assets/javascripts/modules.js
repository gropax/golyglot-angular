var golyglot = angular.module('golyglot', [
    'golyglot.core',
    'golyglot.lexical-entries',
    'golyglot.lang.cmn',
]);

golyglot.constant('availableLanguages', [
    {code: "cmn", name: "Mandarin"},
    {code: "eng", name: "English"},
    {code: "fra", name: "French"},
]);


/* Setup Theme for xeditable module
 */
//golyglot.run(function(editableOptions) {
//    editableOptions.theme = 'bs3';
//});


