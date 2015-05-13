(function() {
    "use strict";

    describe("Representation", function() {
        beforeEach(module("golyglot.representables"));

        var $httpBackend, Representation;

        beforeEach(inject(function(_$httpBackend_, _Representation_) {
            $httpBackend = _$httpBackend_;
            Representation = _Representation_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var reprAttributes = {
            script: "Hans",
            orthographyName: "simplified",
            writtenForm: 'xx'
        };


        describe("#clone", function() {
            var repr;

            beforeEach(function() {
                repr = new Representation(reprAttributes);
            });

            it("should return a clone", function() {
                var clone = repr.clone();
                expect(clone).toEqual(repr);
                expect(clone).not.toBe(repr);
            });
        });

        describe("#isBlank", function() {
            it("should return true if writtenForm is blank", function() {
                var undef = new Representation({writtenForm: undefined});
                var blank = new Representation({writtenForm: ''});

                expect(undef.isBlank()).toBe(true);
                expect(blank.isBlank()).toBe(true);
            });

            it("should return false if writtenForm is not blank", function() {
                var repr = new Representation({writtenForm: 'bougle'});
                expect(repr.isBlank()).toBe(false);
            });
        });

    });
})();
