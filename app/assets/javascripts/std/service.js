angular.module('golyglot.std').service('std', std);

// Provide a helper method to build language-specific representation getters.
// Is it the appropriate module for it ?
//
function std() {

    this.representation = representation;


    function representation(key, val) {
        var fn = function(reprs) {
            repr = _.detect(reprs, function(r) { return r[key] === val; });

            return repr.writtenForm;
        };

        return fn;
    }

}
