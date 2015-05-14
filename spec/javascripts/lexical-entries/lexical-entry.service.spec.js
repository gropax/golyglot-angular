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



        var lexicalEntryAttrs = {
            id: '456',
            lexiconId: 'abc',
            language: 'cmn',
            lemma: {
                id: '123',
                lexicalEntryId: '456',
                language: 'cmn',
                representations: [
                    {
                        id: '789',
                        script: "Hans",
                        orthographyName: "simplified",
                        writtenForm: 'xx'
                    }
                ]
            }
        };


        describe("resource URI", function() {
            it("GET /api/lexicons/:lexicon_id/lexical_entries/:id", function() {
                $httpBackend.expectGET('/api/lexicons/456/lexical_entries/123').respond(200);
                LexicalEntry.get({id: 123, lexiconId: 456});
                $httpBackend.flush();
            });
        });

        describe("#lemma", function() {
            var lex 

            describe("when new empty object", function() {
                beforeEach(function() {
                    lex = new LexicalEntry({language: 'cmn'});
                    console.log("lex: " + JSON.stringify(lex));
                });

                it("returns a Lemma resource", function() {
                    expect(lex.lemma.constructor).toEqual(Lemma);
                });
            });

            describe("when new object with data", function() {
                beforeEach(function() {
                    lex = new LexicalEntry({
                        lemma: {formRepresentations: []},
                    });
                });

                it("returns a Lemma resource", function() {
                    expect(lex.lemma.constructor).toEqual(Lemma);
                });

                it("returns the original data", function() {
                    expect(lex.lemma.formRepresentations).toEqual([]);
                });
            });

            describe("when object from server", function() {
                beforeEach(function() {
                    lex = new LexicalEntry({id: 123, lexiconId: 456});
                    $httpBackend.expectGET('/api/lexicons/456/lexical_entries/123').respond(200, {
                        lemma: {formRepresentations: []},
                    });
                    lex.get();
                    $httpBackend.flush();
                });

                it("returns a Lemma resource", function() {
                    expect(lex.lemma.constructor).toEqual(Lemma);
                });

                it("returns the original data", function() {
                    expect(lex.lemma.formRepresentations).toEqual([]);
                });
            });
        });

        describe("#clone", function() {
            var lexicalEntry;

            beforeEach(function() {
                lexicalEntry = new LexicalEntry(lexicalEntryAttrs);
            });

            it("should return a clone", function() {
                var clone = lexicalEntry.clone();
                expect(clone).toEqual(lexicalEntry);
                expect(clone).not.toBe(lexicalEntry);
            });

            it("should clone the lexiconId", function() {
                var clone = lexicalEntry.clone();
                expect(clone.lexiconId).toEqual(lexicalEntry.lexiconId);
            });
        });


    });
})();
