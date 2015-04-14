angular.module('golyglot.lang.cmn').filter('cmnCharacters', cmnCharacters);

cmnCharacters.$inject = ['$filter'];

function cmnCharacters($filter) {
    var charsets = {
        simplified: $filter('cmnSimplified'),
        traditional: $filter('cmnTraditional'),
    };

    return function(input, charset) {
        return charsets[charset](input);
    }
}
