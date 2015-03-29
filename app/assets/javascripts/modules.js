var golyglot = angular.module('golyglot', [
    'underscore',
    'templates',
    'ui.router',
    'ui.bootstrap',
    'rails',

    'golyglot.core',
    //'xeditable'
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


