angular.module('golyglot.representables').factory('Representation', Factory);

Factory.$inject = ['RailsResource'];

function Factory(RailsResource) {

    RailsResource.extendTo(Representation);
    Representation.configure({
        //url: "/api/representations/{{id}}",
        name: "representation",
    });

    function Representation() {
        Representation.__super__.constructor.apply(this, arguments);
    }

    // Fast deep copy
    //
    Representation.prototype.clone = function() {
        var attrs = {
            script: this.script,
            orthographyName: this.orthographyName,
            writtenForm: this.writtenForm,
        };

        var repr = new Representation(attrs);
        if (this.id) { repr.id = this.id; }

        return repr;
    };

    return Representation;
}
