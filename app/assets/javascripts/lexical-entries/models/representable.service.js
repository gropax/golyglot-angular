angular.module('golyglot.lexical-entries').factory('Representable', RepresentableFactory);

RepresentableFactory.$inject = ['RailsResource', 'railsSerializer', 'Representation'];

function RepresentableFactory(RailsResource, railsSerializer, Representation) {

    function Representable() {
        Representable.__super__.constructor.apply(this, arguments);

        // Initialize if none given
        if (!this.representations) {
            this.representations = [];
        }
    }

    RailsResource.extendTo(Representable);
    Representable.configure({
        //url: "/api/lexical_entries/{{lexicalEntryId}}/lemma",
        name: "representable",
        serializer: railsSerializer(function() {
            this.resource('representations', Representation);
        }),
    });

    // Fast deep copy
    //
    Representable.prototype.clone = function() {
        var reprs = [];
        var thisReprs = this.representations;
        for (var i = 0 ; i < thisReprs.length ; i++) {
            reprs.push(thisReprs[i].clone());
        }

        var cloned = new Representable();
        cloned.representations = reprs;

        return cloned;
    };


    return Representable;
}
