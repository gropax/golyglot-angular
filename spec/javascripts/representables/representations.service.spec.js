(function() {
    "use strict";

    describe("Representations", function() {
        beforeEach(module("golyglot.representables"));

        var Representations, Representation, RepresentationSchema;

        beforeEach(inject(function(_Representations_, _Representation_, _RepresentationSchema_) {
            Representations = _Representations_;
            Representation = _Representation_;
            RepresentationSchema = _RepresentationSchema_;
        }));


        var reprsAttrs = [
            {
                id: "123",
                script: "Hans",
                orthographyName: "simplified",
                writtenForm: 'xxx'
            },
            {
                id: "456",
                script: "Hant",
                orthographyName: "traditional",
                writtenForm: 'XXX'
            },
            {
                id: "789",
                script: "Latn",
                orthographyName: "pinyin",
                writtenForm: 'ni3hao3'
            },
        ];

        var reprs;
        beforeEach(function() {
            reprs = new Representations(reprsAttrs);
        });


        describe("constructor", function() {
            it("should be idempotent", function() {
                var newReprs = new Representations(reprs);
                expect(newReprs).toEqual(reprs);
            });
        });

        describe("#push", function() {
            it("should append element in #representations", function() {
                reprs.push('whatever');
                expect(reprs.toArray().length).toBe(4);
            });
        });

        describe("#toArray", function() {
            it("should return an array of Representations", function() {
                var array = reprs.toArray();
                expect(array.length).toBe(3);
                expect(array[0].constructor).toBe(Representation);
            });
        });

        describe("#setAttributes", function() {
            beforeEach(function() {
                reprs.setAttributes([{
                    id: '111',
                    script: 'Fake'
                }]);
            });

            it("should overwrite array", function() {
                expect(reprs.toArray()).toEqual([
                    new Representation({id: '111', script: 'Fake'})
                ]);
            });
        });

        describe("#serialize", function() {
            describe("without options", function() {
                it("should return this as an Object", function() {
                    expect(reprs.serialize()).toEqual(reprsAttrs);
                });
            });

            describe("with `excludeEmptyRepresentations`", function() {
                it("should exclude empty representations", function() {
                    reprs.push(new Representation({script: 'Fake'}));
                    var obj = reprs.serialize({excludeEmptyRepresentations: true});
                    expect(obj).toEqual(reprsAttrs);
                });
            });
        });

        describe("#clone", function() {
            it("should return a clone", function() {
                var clone = reprs.clone();
                expect(clone).toEqual(reprs);
                expect(clone).not.toBe(reprs);
            });
        });

        describe("#isBlank", function() {
            it("should return true if no representations", function() {
                reprs = new Representations();
                expect(reprs.isBlank()).toBe(true);
            });

            it("should return true all representations are blank", function() {
                reprs = new Representations([{
                    writtenForm: '',
                }]);
                expect(reprs.isBlank()).toBe(true);
            });

            it("should return false if one representation is not blank", function() {
                expect(reprs.isBlank()).toBe(false);
            });
        });

        describe("find", function() {
            describe("when not found", function() {
                it("should return false", function() {
                    var schema = {script: 'Fake', orthographyName: 'notFound'};
                    expect(reprs.find(schema)).toBe(false);
                });
            });

            describe("when found", function() {
                it("should return the Representation", function() {
                    var repr = reprs.toArray()[0];
                    var schema = {script: 'Hans', orthographyName: 'simplified'};
                    expect(reprs.find(schema)).toBe(repr);
                });
            });
        });

        describe("findOrCreate", function() {
            describe("when not found", function() {
                it("should create a new Representation", function() {
                    var schema = new RepresentationSchema({script: 'Fake', orthographyName: 'notFound'});
                    var repr = schema.new();
                    expect(reprs.findOrCreate(schema)).toEqual(repr);
                    expect(reprs.toArray().length).toBe(4);
                });
            });

            describe("when found", function() {
                it("should return the Representation", function() {
                    var repr = reprs.toArray()[0];
                    var schema = {script: 'Hans', orthographyName: 'simplified'};
                    expect(reprs.findOrCreate(schema)).toEqual(repr);
                    expect(reprs.toArray().length).toBe(3);
                });
            });
        });

    });
})();
