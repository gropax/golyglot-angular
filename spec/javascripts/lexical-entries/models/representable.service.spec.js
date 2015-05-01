(function() {
    "use strict";

    describe("Representable", function() {
        angular.module("golyglot.lexical-entries.test", [
            'ngMock',
            'golyglot.lexical-entries',
        ]);

        beforeEach(module("golyglot.lexical-entries.test"));

        var $httpBackend, Representable, Representation;

        beforeEach(inject(function(_$httpBackend_, _Representable_, _Representation_) {
            $httpBackend = _$httpBackend_;
            Representable = _Representable_;
            Representation = _Representation_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var representableAttributes = {
            representations: [{script: "Hans", orthographyName: "simplified", writtenForm: 'xx'}]
        };

        describe("#representations", function() {
            var representable 

            describe("when new empty object", function() {
                beforeEach(function() {
                    representable = new Representable();
                });

                it("returns an empty array", function() {
                    expect(representable.representations).toEqual([]);
                });
            });

            describe("when new object with data", function() {
                var representation;

                beforeEach(function() {
                    representable = new Representable(representableAttributes);
                    representation = representable.representations[0];
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
            var representable;

            beforeEach(function() {
                representable = new Representable(representableAttributes);
            });

            it("should return a clone", function() {
                var clone = representable.clone();
                expect(clone).toEqual(representable);
                expect(clone).not.toBe(representable);
            });
        });

    });
})();
