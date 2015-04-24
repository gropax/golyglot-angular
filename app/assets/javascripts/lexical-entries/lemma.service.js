angular.module('golyglot.lexical-entries').factory('Lemma', LemmaFactory);

LemmaFactory.$inject = ['RailsResource'];

function LemmaFactory(RailsResource) {

    RailsResource.extendTo(Lemma);
    Lemma.configure({
        url: "/api/lemma/{{id}}",
        name: "lemma",
    });

    function Lemma() {
        Lemma.__super__.constructor.apply(this, arguments);

        // Initialize an empty array for FormRepresentation resource
        this.formRepresentations = [];

        this.debugId = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }


    return Lemma;
}
