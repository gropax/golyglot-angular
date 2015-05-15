angular.module('golyglot.representables').factory('Representation', Factory);

function Factory() {

    function Representation(args) {
        this.id = args.id;
        this.script = args.script;
        this.orthographyName = args.orthographyName;
        this.writtenForm = args.writtenForm;
    }

    // Fast deep copy
    //
    Representation.prototype.clone = function() {
        var repr = new Representation({
            id: this.id,
            script: this.script,
            orthographyName: this.orthographyName,
            writtenForm: this.writtenForm,
        });

        return repr;
    };

    Representation.prototype.isBlank = function() {
        return !this.writtenForm || this.writtenForm === '';
    }

    return Representation;
}
