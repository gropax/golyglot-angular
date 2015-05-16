angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['Representation'];

function LemmaFactory(Representation) {

    function Lemma(args) {
        this.id = args.id;
        this.lexicalEntry = args.lexicalEntry;

        var argsReprs = args.representations || [];
        var reprs = [];

        angular.forEach(argsReprs, function(repr) {
            reprs.push(new Representation(repr));
        });
        this.representations = reprs;
    }

    Object.defineProperty(Lemma.prototype, 'language', {
        get: function() {
            return this.lexicalEntry.language;
        }
    });

    Lemma.prototype.setAttributes = function(args) {
        if (args.id) { this.id = args.id; }
        if (args.representations) {
            var reprs = [];
            angular.forEach(args.representations, function(repr) {
                reprs.push(new Representation(repr));
            });
            this.representations = reprs;
        }
    };

    Lemma.prototype.serialize = function() {
        // Serialize Representations
        var serializedReprs = [];
        angular.forEach(this.representations, function(repr) {
            serializedReprs.push(repr.serialize());
        });

        var lemma = {
            representations: serializedReprs,
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
    };


    return Lemma;
}
