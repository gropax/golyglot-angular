angular.module('golyglot.representables').factory('Representable', RepresentableFactory);

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
        name: "representable",
        serializer: railsSerializer(function() {
            this.resource('representations', Representation);
            this.rename('_language', 'language');
        }),
    });


    /* Add a getter for the `language` property that throw an error if the
     * property is undefined. Validation in the constructor is made impossible
     * by RailsResource calling it multiple time.
     */
    Object.defineProperty(Representable.prototype, 'language', {
        get: function() {
            if (this._language) {
                return this._language;
            } else {
                throw new RepresentableError('Representable has no language');
            }
        }
    });

    // Fast deep copy
    //
    Representable.prototype.clone = function() {
        var reprs = [];
        var thisReprs = this.representations;
        for (var i = 0 ; i < thisReprs.length ; i++) {
            reprs.push(thisReprs[i].clone());
        }

        var cloned = new Representable({
            language: this.language,
        });

        cloned.representations = reprs;

        return cloned;
    };


    function RepresentableError(message) {
      this.name = 'RepresentableError';
      this.message = message;
    }
    RepresentableError.prototype = new Error();
    RepresentableError.prototype.constructor = RepresentableError;

    Representable.RepresentableError = RepresentableError;


    return Representable;
}
