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

        // Initialize a new Lemma nested resource
        //var lemmaParams = arguments[0] && arguments[0].lemma;
        //this.lemma = new Lemma(lemmaParams);
        
        //$log.debug('this: ' + JSON.stringify(this, true));
        //$log.debug('arguments: ' + JSON.stringify(arguments, true));
        //this.lemma.lexicalEntryId = arguments.id;
    }


    return LexicalEntry;
}
