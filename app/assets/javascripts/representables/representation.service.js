angular.module('golyglot.representables').factory('Representation', Factory);

function Factory() {

    function Representation(args) {
        this.id = args.id;
        this.script = args.script;
        this.orthographyName = args.orthographyName;
        this.writtenForm = args.writtenForm;
    }

    Representation.prototype.serialize = function() {
        var repr = {
            script: this.script,
            orthographyName: this.orthographyName,
            writtenForm: this.writtenForm,
        };
        if (this.id) { repr.id = this.id; }

        return repr;
    };

    // Fast deep copy
    //
    Representation.prototype.clone = function() {
        return new Representation(this.serialize());
    };

    Representation.prototype.isBlank = function() {
        return !this.writtenForm || this.writtenForm === '';
    }

    return Representation;
}
