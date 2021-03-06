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


        var reprAttrs = {
            id: '123',
            script: "Hans",
            orthographyName: "simplified",
            writtenForm: 'xx'
        };

        var repr;
        beforeEach(function() {
            repr = new Representation(reprAttrs);
        });


        describe("constructor", function() {
            it("should be idempotent", function() {
                var newRepr = new Representation(repr);
                expect(newRepr).toEqual(repr);
            });
        });

        describe("#serialize", function() {
            it("should return this' data as an Object", function() {
                expect(repr.serialize()).toEqual(reprAttrs);
            });
        });

        describe("#clone", function() {
            it("should return a clone", function() {
                var clone = repr.clone();
                expect(clone).toEqual(repr);
                expect(clone).not.toBe(repr);
            });
        });

        describe("#isNew", function() {
            it("should return true if has no id", function() {
                delete repr.id;
                expect(repr.isNew()).toBe(true);
            });

            it("should return false if has an id", function() {
                expect(repr.isNew()).toBe(false);
            });
        });

        describe("#isBlank", function() {
            it("should return true if writtenForm is `''`", function() {
                repr.writtenForm = '';
                expect(repr.isBlank()).toBe(true);
            });

            it("should return true if writtenForm is falsy", function() {
                repr.writtenForm = undefined;
                expect(repr.isBlank()).toBe(true);
            });

            it("should return false if writtenForm is not blank", function() {
                expect(repr.isBlank()).toBe(false);
            });
        });

    });
})();
