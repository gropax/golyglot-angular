(function() {
    "use strict";

    describe("Representable", function() {
        angular.module("golyglot.representables.test", [
            'ngMock',
            'golyglot.representables',
        ]);

        beforeEach(module("golyglot.representables.test"));

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
            language: 'cmn',
            representations: [{script: "Hans", orthographyName: "simplified", writtenForm: 'xx'}]
        };

        describe("#representations", function() {
            var representable 

            describe("when new empty object", function() {
                beforeEach(function() {
                    representable = new Representable({language: 'cmn'});
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

                it("returns an array of `Representation`s", function() {
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

        describe("#language", function() {
            var representable;

            describe("when defined", function() {
                beforeEach(function() {
                    representable = new Representable({language: 'cmn'});
                });

                it("should return the language", function() {
                    expect(representable.language).toEqual('cmn');
                });

                it("should store the data in `_language`", function() {
                    expect(representable._language).toEqual('cmn');
                });
            });

            describe("when undefined", function() {
                beforeEach(function() {
                    representable = new Representable();
                });

                it("should throw RepresentableError", function() {
                    var error = new Representable.RepresentableError('Representable has no language');
                    expect(function() { representable.language; }).toThrow(error);
                });
            });
        });

    });
})();
