angular.module('golyglot.lexical-entries').factory('LexicalEntry', LexicalEntryFactory);

LexicalEntryFactory.$inject = ['$http', 'Lemma'];

function LexicalEntryFactory($http, Lemma) {

    function LexicalEntry(args) {
        this.lemma = new Lemma({lexicalEntry: this});
        this.setAttributes(args);
    }

    LexicalEntry.get = function(args) {
        url = "api/lexicons/" + args.lexiconId + "/lexical_entries/" + args.id;

        return $http.get(url).then(function(response) {
            return new LexicalEntry(response.data);
        });
    };

    LexicalEntry.query = function(args, query) {
        return $http({
            url: "api/lexicons/" + args.lexiconId + "/lexical_entries",
            method: 'GET',
            params: query
        }).then(function(response) {
            var lexicalEntries = [];
            angular.forEach(response.data, function(lexicalEntry) {
                lexicalEntries.push(new LexicalEntry(lexicalEntry));
            })
            return lexicalEntries;
        });
    };

    LexicalEntry.prototype.create = function() {
        var lexicalEntry = this;

        return $http({
            url: "api/lexicons/" + this.lexiconId + "/lexical_entries",
            method: 'POST',
            data: this.serialize(),
        }).then(function(response) {
            lexicalEntry.setAttributes(response.data);
            return lexicalEntry;
        });
    };

    LexicalEntry.prototype.setAttributes = function(args) {
        var lexicalEntry = this;
        // Overwrite properties
        angular.forEach(['id', 'lexiconId', 'language'], function(attr) {
            if (args[attr]) { lexicalEntry[attr] = args[attr]; }
        });
        // Update references
        if (args.lemma) { this.lemma.setAttributes(args.lemma); }
    };

    LexicalEntry.prototype.serialize = function() {
        var obj = {
            lexiconId: this.lexiconId,
            language: this.language,
            lemma: this.lemma.serialize(),
        }
        if (this.id) { obj.id = this.id; }

        return obj;
    };

    LexicalEntry.prototype.clone = function() {
        return new LexicalEntry(this.serialize());
    };

    return LexicalEntry;
}
