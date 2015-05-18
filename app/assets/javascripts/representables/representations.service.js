angular.module('golyglot.representables').factory('Representations', Factory);

Factory.$inject = ['Representation'];

function Factory(Representation) {

    function Representations(args) {
        var args = args || [];
        // Make constructor idempotent
        var reprsAttrs = args.representations || args;

        this.setAttributes(reprsAttrs);
    }

    Representations.prototype.toArray = function() {
        return this.representations;
    };

    Representations.prototype.push = function(elem) {
        return this.representations.push(elem);
    };

    Representations.prototype.setAttributes = function(args) {
        var reprs = [];
        angular.forEach(args, function(repr) {
            reprs.push(new Representation(repr));
        });
        this.representations = reprs;
    }

    Representations.prototype.serialize = function(opts) {
        var opts = opts || {};
        var excludeEmpty = opts.excludeEmptyRepresentations;

        var reprs = [];
        angular.forEach(this.representations, function(repr) {
            if (!repr.isBlank() || !excludeEmpty) {
                reprs.push(repr.serialize());
            }
        });

        return reprs;
    };

    // Fast deep copy
    //
    Representations.prototype.clone = function() {
        return new Representations(this.serialize());
    };

    Representations.prototype.isBlank = function() {
        var reprs = this.representations,
            blank = true;

        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (!repr.isBlank()) {
                blank = false;
                break;
            }
        }
        return blank;
    }

    Representations.prototype.find = function(schema) {
        var reprs = this.representations;
        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (repr.orthographyName === schema.orthographyName) {
                return repr;
            }
        }
        return false;
    }

    Representations.prototype.findOrCreate = function(schema) {
        var repr = this.find(schema);
        if (!repr) {
            repr = schema.new();
            this.representations.push(repr);
        }
        return repr;
    };

    return Representations;
}
