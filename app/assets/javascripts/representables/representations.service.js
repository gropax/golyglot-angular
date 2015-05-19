angular.module('golyglot.representables').factory('Representations', Factory);

Factory.$inject = ['Representation'];

function Factory(Representation) {

    function Representations(args) {
        var args = args || [];
        // Make constructor idempotent
        var reprsAttrs = args.representations || args;

        this.setAttributes(reprsAttrs);
    }

    Object.defineProperty(Representations.prototype, 'length', {
        get: function() {
            return this.representations.length;
        }
    });

    Representations.prototype.toArray = function() {
        return this.representations;
    };

    Representations.prototype.at = function(i) {
        return this.representations[i];
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
    };

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


    Representations.prototype.equal = function(other) {
        var reprs = this.rejectNewBlank(),
            otherReprs = other.rejectNewBlank(),
            eq = true;

        if (reprs.length !== otherReprs.length)
            return false;

        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs.toArray()[i];
            var otherRepr = otherReprs.find(repr);

            if (!otherRepr || repr.writtenForm !== otherRepr.writtenForm) {
                eq = false;
                break;
            }
        }
        return eq;
    };

    Representations.prototype.rejectNewBlank = function() {
        var reprs = [];
        angular.forEach(this.representations, function(repr) {
            if (!repr.isNew() && !repr.isBlank())
                reprs.push(repr);
        })
        return new Representations(reprs);
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

    Representations.prototype.findById = function(id) {
        var reprs = this.representations;
        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (repr.id === id) {
                return repr;
            }
        }
        return false;
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

    Representations.prototype.diffFrom = function(other) {
        var reprsDiff = [];

        console.log("other.length: " + JSON.stringify(other.length));

        // Update existing
        for (var i = 0 ; i < other.length ; i++) {
            var otherRepr = other.at(i);

            if (otherRepr.isNew())
                continue;

            var thisRepr = this.findById(otherRepr.id);
            if (thisRepr.writtenForm === '') {
                reprsDiff.push({id: otherRepr.id, _destroy: '1'});
            } else if (thisRepr.writtenForm !== otherRepr.writtenForm) {
                reprsDiff.push({id: otherRepr.id, writtenForm: thisRepr.writtenForm});
            }
        }
        
        // Create new
        for (var i = 0 ; i < this.length ; i++) {
            var thisRepr = this.at(i);

            if (thisRepr.isNew()) {
                if (!thisRepr.isBlank()) {
                    reprsDiff.push(thisRepr.serialize());
                }
            }
        }

        return reprsDiff;
    }

    return Representations;
}
