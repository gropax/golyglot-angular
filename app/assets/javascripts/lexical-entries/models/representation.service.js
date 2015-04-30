angular.module('golyglot.lexical-entries').factory('Representation', Factory);

Factory.$inject = ['RailsResource'];

function Factory(RailsResource) {

    RailsResource.extendTo(Representation);
    Representation.configure({
        url: "/api/representations/{{id}}",
        name: "representation",
    });

    function Representation() {
        Representation.__super__.constructor.apply(this, arguments);
    }

    // Fast deep copy
    //
    Representation.prototype.clone = function() {
        var attrs = {
            id: this.id,
            script: this.script,
            orthographyName: this.orthographyName,
            writtenForm: this.writtenForm,
        };
        return new Representation(attrs);
    };

    return Representation;
}
