angular.module('golyglot.core', [
    // It feel strange that core include language-specific modules, should be
    // golyglot.app
    'golyglot.std',        
    'golyglot.cmn',        
    'golyglot.eng',        
]);
