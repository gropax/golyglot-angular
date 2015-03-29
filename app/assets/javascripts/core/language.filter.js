angular.module('golyglot.core').filter('language', language);

function language () {
    return function (items, lang) {
        var filtered = [];
        for (var i = 0; i < items.length; i++) {
            var item = items[i];
            if (item.language === lang) {
                filtered.push(item); 
            }
        }
        return filtered;
    };
}
