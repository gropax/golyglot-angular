(function() {
    "use strict";

    describe("RepresentationSchema", function() {
        beforeEach(module("golyglot.lang"));

        var RepresentationSchema, Representation;

        beforeEach(inject(function(_RepresentationSchema_, _Representation_) {
            RepresentationSchema = _RepresentationSchema_;
            Representation = _Representation_;
        }));


        var reprSchemaAttrs = {
            script: "Hans",
            orthographyName: "simplified",
        };

        var reprAttrs = angular.extend({writtenForm: 'xxx'}, reprSchemaAttrs);

        var reprSchema, repr;
        beforeEach(function() {
            reprSchema = new RepresentationSchema(reprSchemaAttrs);
            repr = new Representation(reprAttrs);
        });


        describe("when used as a constructor", function() {
            it("should create a new Representation", function() {
                expect(reprSchema.new('xxx')).toEqual(repr);
            });
        });
    });
})();
