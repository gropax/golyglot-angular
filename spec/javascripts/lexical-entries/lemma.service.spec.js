(function() {
    "use strict";

    describe("Lemma", function() {
        //angular.module("golyglot.lexical-entries.test", [
        //    'ngMock',
        //    'golyglot.lexical-entries',
        //]);

        //beforeEach(module("golyglot.lexical-entries.test"));
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


        var lemmaAttributes = {
            id: '123',
            lexicalEntryId: '456',
            //language: 'cmn',
            representations: [
                {
                    id: '789',
                    script: "Hans",
                    orthographyName: "simplified",
                    writtenForm: 'xx'
                }
            ]
        };


        describe("#representations", function() {
            var lemma 

            describe("when new empty object", function() {
                beforeEach(function() {
                    lemma = new Lemma(); //{language: 'cmn'});
                });

                it("returns an empty array", function() {
                    expect(lemma.representations).toEqual([]);
                });
            });

            var representation;

            describe("when new object with data", function() {
                beforeEach(function() {
                    lemma = new Lemma(lemmaAttributes);
                    representation = lemma.representations[0];
                });

                it("returns a Lemma resource", function() {
                    expect(representation.constructor).toEqual(Representation);
                });

                it("returns the original data", function() {
                    expect(representation.writtenForm).toEqual('xx');
                });
            });

            describe("when fetched from server", function() {
                beforeEach(function() {
                    lemma = new Lemma({id: 123, lexicalEntryId: 456});
                    $httpBackend.expectGET('/api/lexical_entries/456/lemma').respond(200, lemmaAttributes);

                    lemma.get();
                    $httpBackend.flush();

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
            var lemma;

            beforeEach(function() {
                lemma = new Lemma(lemmaAttributes);
            });

            it("should return a clone", function() {
                var clone = lemma.clone();
                expect(clone).toEqual(lemma);
                expect(clone).not.toBe(lemma);
            });
        });

    });
})();
