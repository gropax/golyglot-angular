angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['$http', 'Representation', 'Representations'];

function LemmaFactory($http, Representation, Representations) {

    function Lemma(args) {
        var args = args || {};

        this.id = args.id;
        this.lexicalEntry = args.lexicalEntry;
        this.representations = new Representations(args.representations);
    }

    Object.defineProperty(Lemma.prototype, 'language', {
        get: function() {
            return this.lexicalEntry.language;
        }
    });

    Lemma.prototype.updateFrom = function(original) {
        var lemma = this;
        var reprsDiff = this.representations.diffFrom(original.representations);

        return $http({
            url: "api/lexical_entries/" + this.lexicalEntry.id + "/lemma",
            method: 'PUT',
            data: {representations: reprsDiff},
        }).then(function(response) {
            lemma.setAttributes(response.data);
            return lemma;
        });
    }

    Lemma.prototype.setAttributes = function(args) {
        if (args.id) { this.id = args.id; }
        if (args.representations) {
            this.representations.setAttributes(args.representations);
        }
    };

    /* @options
     *     excludeEmptyRepresentations
     *
     */
    Lemma.prototype.serialize = function(opts) {
        var lemma = {
            representations: this.representations.serialize(opts),
        };
        if (this.id) { lemma.id = this.id; }

        return lemma;
    };

    Lemma.prototype.clone = function() {
        var lemma = new Lemma(this.serialize());
        lemma.lexicalEntry = this.lexicalEntry;

        return lemma;
    };

    //   Form is valid unless all fields are blank
    //
    Lemma.prototype.isBlank = function() {
        return this.representations.isBlank();
    };

    Lemma.prototype.isNew = function() {
        return !this.id;
    };

    Lemma.prototype.isModified = function(basis) {
        return !this.representations.equal(basis.representations);
    };

    Lemma.prototype.findRepresentation = function(schema) {
        var reprs = this.representations;
        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (repr.orthographyName === schema.orthographyName) {
                return repr;
            }
        }
        return false;
    }

    Lemma.prototype.findOrCreateRepresentation = function(schema) {
        var repr = this.findRepresentation(schema);
        if (!repr) {
            repr = schema.new();
            this.representations.push(repr);
        }
        return repr;
    };


    return Lemma;
}
