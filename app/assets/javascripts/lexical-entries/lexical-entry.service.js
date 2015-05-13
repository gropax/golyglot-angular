angular.module('golyglot.lexical-entries').factory('LexicalEntry', LexicalEntryFactory);

LexicalEntryFactory.$inject = ['RailsResource', 'railsSerializer', 'Lemma', '$log'];

function LexicalEntryFactory(RailsResource, railsSerializer, Lemma, $log) {

    RailsResource.extendTo(LexicalEntry);
    LexicalEntry.configure({
        url: "/api/lexicons/{{lexiconId}}/lexical_entries/{{id}}",
        name: "lexicalEntry",
        serializer: railsSerializer(function() {
            this.resource('lemma', Lemma);
        }),
    });

    function LexicalEntry() {
        LexicalEntry.__super__.constructor.apply(this, arguments);

        // Initialize a new Lemma if none given
        if (!this.lemma) {
            this.lemma = new Lemma();
        }
    }

    // Fast deep copy
    //
    LexicalEntry.prototype.clone = function() {
        var cloned = new LexicalEntry({
            id: this.id,
            lexiconId: this.lexiconId,
            language: this.language,
            lemma: this.lemma.clone()
        });

        return cloned;
    };


    return LexicalEntry;
}
