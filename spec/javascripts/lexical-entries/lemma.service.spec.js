(function() {
    "use strict";

    describe("Lemma", function() {
        beforeEach(module("golyglot.lexical-entries"));

        var $httpBackend, Lemma, Representation;

        beforeEach(inject(function(_$httpBackend_, _Lemma_, _Representation_) {
            $httpBackend = _$httpBackend_;
            Lemma = _Lemma_;
            Representation = _Representation_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var fakeLexicalEntry = {id: '123', language: 'cmn'};

        var lemmaAttrs = {
            id: '123',
            lexicalEntry: fakeLexicalEntry,
            representations: [
                {
                    id: '789',
                    script: "Hans",
                    orthographyName: "simplified",
                    writtenForm: 'xx'
                }
            ]
        };

        var lemma;
        beforeEach(function() {
            lemma = new Lemma(lemmaAttrs);
        });


        describe("#update", function() {
            // @todo
        });

        describe("#lexicalEntry", function() {
            it("should returns lemma's parent", function() {
                expect(lemma.lexicalEntry).toBe(fakeLexicalEntry);
            });
        });

        describe("#language", function() {
            it("should returns lexical entry's language", function() {
                expect(lemma.language).toEqual(fakeLexicalEntry.language);
            });
        });
        
        describe("#representations", function() {
            describe("when created empty", function() {
                beforeEach(function() {
                    lemma = new Lemma({});
                });

                it("returns an empty array", function() {
                    expect(lemma.representations).toEqual([]);
                });
            });

            describe("when created with data", function() {
                var representation;
                beforeEach(function() {
                    representation = lemma.representations[0];
                });

                it("returns a Lemma resource", function() {
                    expect(representation.constructor).toEqual(Representation);
                });

                it("returns the original data", function() {
                    expect(representation.writtenForm).toEqual('xx');
                });
            });
        });

        describe("#clone", function() {
            it("should return a clone", function() {
                var clone = lemma.clone();
                expect(clone).toEqual(lemma);
                expect(clone).not.toBe(lemma);
            });
        });

        describe("#isBlank", function() {
            describe("when no representations", function() {
                it("should return true", function() {
                    var blank = new Lemma({});
                    expect(blank.isBlank()).toBe(true);
                });
            });

            describe("when all representations are blank", function() {
                it("should return true", function() {
                    var blank = new Lemma({representations: [
                        {writtenForm: undefined},
                        {writtenForm: ''}
                    ]});
                    expect(blank.isBlank()).toBe(true);
                });
            });

            describe("when some representations are not blank", function() {
                it("should return false", function() {
                    var lemma = new Lemma({representations: [
                        {writtenForm: 'ni3hao3'},
                        {writtenForm: ''}
                    ]});
                    expect(lemma.isBlank()).toBe(false);
                });
            });
        });

    });
})();
