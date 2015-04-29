angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['RailsResource', 'railsSerializer', 'Representation'];

function LemmaFactory(RailsResource, railsSerializer, Representation) {

    RailsResource.extendTo(Lemma);
    Lemma.configure({
        url: "/api/lexical-entry/{{lexicalEntryId}}/lemma",
        name: "lemma",
        serializer: railsSerializer(function() {
            this.resource('representations', Representation);
        }),
    });

    function Lemma() {
        Lemma.__super__.constructor.apply(this, arguments);

        // Initialize an empty array for FormRepresentation resource
        this.representations = [];
    }

    // Fast deep copy
    //
    Lemma.prototype.clone = function() {
        var attrs = {
            id: this.id,
            lexicalEntryId: this.lexicalEntryId,
        };

        var reprs = [];
        var thisReprs = this.representations;
        for (var i = 0 ; i < thisReprs.length ; i++) {
            reprs.push(thisReprs[i].clone());
        }

        var cloned = new Lemma(attrs);
        cloned.representations = reprs;

        return cloned;
    };


    return Lemma;
}
