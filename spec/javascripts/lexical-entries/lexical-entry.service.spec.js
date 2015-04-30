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
                    lex = new LexicalEntry();
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

    });
})();
