angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['Representation'];

function LemmaFactory(Representation) {

    function Lemma(args) {
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

    // Fast deep copy
    //
    // @fixme
    //     Works but ugly
    //
    // @fixme
    //     To make equality tests pass, should not clone attributes which are `undefined`
    //
    Lemma.prototype.clone = function() {
        var thisReprs = this.representations;

        var reprs = [];
        for (var i = 0 ; i < thisReprs.length ; i++) {
            reprs.push(thisReprs[i].clone());
        }

        // Create new object so the constructor could be `Lemma`
        var lemma = new Lemma({
            lexicalEntry: this.lexicalEntry,
            representations: reprs,
        });

        if (this.id) { lemma.id = this.id; }

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
