(function() {
    "use strict";

    describe("LexicalEntry", function() {
        angular.module("golyglot.lexical-entries.test", [
            'ngMock',
            'golyglot.lexical-entries',
        ]);

        beforeEach(module("golyglot.lexical-entries.test"));

        var $httpBackend, LexicalEntry, Lemma;

        beforeEach(inject(function(_$httpBackend_, _LexicalEntry_, _Lemma_) {
            $httpBackend = _$httpBackend_;
            LexicalEntry = _LexicalEntry_;
            Lemma = _Lemma_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var reprAttrs = {
            id: '789',
            script: "Hans",
            orthographyName: "simplified",
            writtenForm: 'xx'
        };

        var lexicalEntryAttrs = {
            id: '456',
            lexiconId: '007',
            language: 'cmn',
            lemma: {
                id: '123',
                representations: [reprAttrs]
            }
        };

        var lexicalEntry, lemma;
        beforeEach(function() {
            lexicalEntry = new LexicalEntry(lexicalEntryAttrs);
            lemma = lexicalEntry.lemma;
        });


        describe("constructor", function() {
            it("should be idempotent", function() {
                var newLexicalEntry = new LexicalEntry(lexicalEntry);
                expect(newLexicalEntry).toEqual(lexicalEntry);
            });
        });

        describe("::get", function() {
        });

        describe("::create", function() {
        });

        describe("#get", function() {
        });

        describe("#create", function() {
        });

        describe("#lemma", function() {
            it("returns a Lemma resource", function() {
                expect(lemma.constructor).toEqual(Lemma);
            });

            describe("when created empty", function() {
                beforeEach(function() {
                    lexicalEntry = new LexicalEntry({});
                    lemma = lexicalEntry.lemma;
                });

                it("returns an empty lemma", function() {
                    expect(lemma.constructor).toEqual(Lemma);
                    expect(lemma.isBlank()).toBe(true);
                });
            });

            describe("when new object with data", function() {
                it("returns the original data", function() {
                    var repr = lemma.representations[0];
                    expect(repr.writtenForm).toEqual('xx');
                });
            });
        });

        describe("#clone", function() {
            it("should return a clone", function() {
                var clone = lexicalEntry.clone();
                expect(clone).toEqual(lexicalEntry);
                expect(clone).not.toBe(lexicalEntry);
            });
        });

    });
})();
