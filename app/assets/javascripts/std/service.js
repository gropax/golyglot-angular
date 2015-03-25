angular.module('golyglot.std').service('std', std);

function std() {

    this.representation = representation;


    function representation(key, val) {
        var fn = function(form) {
            if (form === undefined) { return undefined; }

            repr = _.detect(form.representations, function(r) {
                return r[key] === val;
            });

            return repr.writtenForm;
        };

        return fn;
    }

}
