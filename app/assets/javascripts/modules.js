var golyglot = angular.module('golyglot', [
    'golyglot.core',
    'golyglot.auth',
    'golyglot.header',
    'golyglot.lang',
    'golyglot.users',
    'golyglot.lexicons',
    'golyglot.representables',
    'golyglot.lexical-entries',

    // Language plugins
    'golyglot.lang.cmn',
    'golyglot.lang.ara',
    'golyglot.lang.eng',
    'golyglot.lang.fra',
]);
