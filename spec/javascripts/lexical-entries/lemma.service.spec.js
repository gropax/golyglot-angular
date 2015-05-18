(function() {
    "use strict";

    describe("Lemma", function() {
        beforeEach(module("golyglot.lexical-entries"));

        var $httpBackend, Lemma, Representation, RepresentationSchema, Representations;

        beforeEach(inject(function(_$httpBackend_, _Lemma_, _Representation_, _RepresentationSchema_, _Representations_) {
            $httpBackend = _$httpBackend_;
            Lemma = _Lemma_;
            Representation = _Representation_;
            Representations = _Representations_;
            RepresentationSchema = _RepresentationSchema_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var fakeLexicalEntry = {id: '123', language: 'cmn'};

        var lemmaAttrs = {
            id: '123',
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
            lemma.lexicalEntry = fakeLexicalEntry;
        });


        describe("constructor", function() {
            it("should be idempotent", function() {
                var newLemma = new Lemma(lemma);
                expect(newLemma).toEqual(lemma);
            });
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
            it("should return a Representations object", function() {
                expect(lemma.representations.constructor).toBe(Representations);
            });
        });

        describe("#setAttributes", function() {
            beforeEach(function() {
                lemma.setAttributes({
                    id: 'abc',
                    representations: [{script: 'Hant'}]
                });
            });

            it("should overwrite all properties", function() {
                expect(lemma.id).toEqual('abc');
                expect(lemma.representations).toEqual(new Representations([
                    new Representation({script: 'Hant'})
                ]));
            });
        });

        describe("#serialize", function() {
            describe("without options", function() {
                it("should return this' data as an Object", function() {
                    expect(lemma.serialize()).toEqual(lemmaAttrs);
                });
            });

            describe("with `excludeEmptyRepresentations`", function() {
                it("should exclude empty representations", function() {
                    var clone = lemma.clone();
                    clone.representations.push(new Representation({script: 'Fake'}));
                    var obj = clone.serialize({excludeEmptyRepresentations: true});
                    expect(obj).toEqual(lemmaAttrs);
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

        describe("#isNew", function() {
            it("should return true if has no id", function() {
                delete lemma.id;
                expect(lemma.isNew()).toBe(true);
            });

            it("should return false if has an id", function() {
                expect(lemma.isNew()).toBe(false);
            });
        });

    });
})();
