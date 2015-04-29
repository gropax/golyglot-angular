angular.module('golyglot.lang').factory('RepresentationSchema', Factory);

Factory.$inject = ['Representation'];

function Factory(Representation) {

    var RepresentationSchema = function(schema) {
        this.schema = schema;
        this.script = schema.script;
        this.orthographyName = schema.orthographyName;
    }

    RepresentationSchema.prototype.findOrCreate = function(hasReprs) {
        var repr = this.find(hasReprs) || this.create();
        return repr;
    };

    RepresentationSchema.prototype.find = function(hasReprs) {
        var reprs = hasReprs.representations;
        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (repr.script === this.script && repr.orthographyName === this.orthographyName) {
                return repr;
            }
        }
        return null;
    };

    RepresentationSchema.prototype.create = function() {
        return new Representation(this.schema);
    };


    return RepresentationSchema;
}
