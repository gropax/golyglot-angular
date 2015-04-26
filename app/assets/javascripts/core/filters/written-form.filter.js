angular.module('golyglot.core').filter('writtenForm', writtenForm);

writtenForm.$inject = [];

function writtenForm() {
    return function(input) {
        var reprs = input ? input.representations : false;

        return reprs ? reprs[0].writtenForm : false;
    };
}
