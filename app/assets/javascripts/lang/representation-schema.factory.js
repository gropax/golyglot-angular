angular.module('golyglot.lang').factory('RepresentationSchema', Factory);

Factory.$inject = ['Representation'];

function Factory(Representation) {

    var RepresentationSchema = function(args) {
        var schema = args || {};
        this.script = schema.script;
        this.orthographyName = schema.orthographyName;
    }

    RepresentationSchema.prototype.findOrCreate = function(representable) {
        var repr = this.find(representable) || this.create();
        return repr;
    };

    RepresentationSchema.prototype.find = function(representable) {
        var reprs = representable.representations;
        for (var i = 0 ; i < reprs.length ; i++) {
            var repr = reprs[i];
            if (repr.script === this.script && repr.orthographyName === this.orthographyName) {
                return repr;
            }
        }
        return null;
    };

    RepresentationSchema.prototype.new = function(writtenForm) {
        return new Representation({
            script: this.script,
            orthographyName: this.orthographyName,
            writtenForm: writtenForm
        });
    };


    return RepresentationSchema;
}
