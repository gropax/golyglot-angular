angular.module('golyglot.lexical-entries').factory('LexicalEntry', LexicalEntryFactory);

LexicalEntryFactory.$inject = ['Lemma'];

function LexicalEntryFactory(Lemma) {

    function LexicalEntry(args) {
        this.id = args.id;
        this.lexiconId = args.lexiconId;
        this.language = args.language;

        var lemmaAttrs = args.lemma || {};
        lemmaAttrs.lexicalEntry = this;
        this.lemma = new Lemma(lemmaAttrs);
    }

    LexicalEntry.prototype.clone = function() {
        var lemma = this.lemma.clone();

        var lexicalEntry = new LexicalEntry({
            lexiconId: this.lexiconId,
            language: this.language,
            lemma: lemma,
        });

        // Do not clone properties that are `undefined`
        if (this.id) { lexicalEntry.id = this.id; }
        // Replace with reference to the clone
        lemma.lexicalEntry = lexicalEntry;

        return lexicalEntry;
    };

    return LexicalEntry;
}
