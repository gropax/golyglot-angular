angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['RailsResource', 'railsSerializer', 'Representable'];

function LemmaFactory(RailsResource, railsSerializer, Representable) {

    function Lemma() {
        Lemma.__super__.constructor.apply(this, arguments);
    }

    Representable.extendTo(Lemma);
    Lemma.configure({
        url: "/api/lexical_entries/{{lexicalEntryId}}/lemma",
        name: "lemma",
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
        var clonedRepr = Lemma.__super__.clone.apply(this);

        // Create new object so the constructor could be `Lemma`
        var cloned = new Lemma(clonedRepr);

        if (this.id) { cloned.id = this.id; }
        if (this.lexicalEntryId) { cloned.lexicalEntryId = this.lexicalEntryId; }

        return cloned;
    };


    return Lemma;
}
