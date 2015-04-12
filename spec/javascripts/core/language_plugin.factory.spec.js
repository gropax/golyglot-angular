(function() {
    "use strict";

    describe("LanguagePlugin", function() {
        var LanguagePlugin;

        beforeEach(module('golyglot.core'));

        beforeEach(inject(function(_LanguagePlugin_){
            LanguagePlugin = _LanguagePlugin_;
        }));

        it("is initialized with a code", function() {
            var plugin = new LanguagePlugin("cmn");
            expect(plugin.code).toEqual('cmn');
        });

        

        describe("#representations", function() {
            var reprs = [
                {
                    script: 'Hans',
                    writtenForm: 'SIMPLIFIED',
                },
                {
                    script: 'Hant',
                    writtenForm: 'TRADITIONAL',
                },
                {
                    script: 'Latn',
                    orthographyName: 'pinyin',
                    writtenForm: 'PINYIN',
                },
            ];

            var plugin;

            beforeEach(function() {
                plugin = new LanguagePlugin('cmn');
                plugin.representations({
                    simplified: {script: 'Hans'},
                    traditional: {script: 'Hant'},
                    pinyin: {script: 'Latn', orthographyName: 'pinyin'},
                });
            });


            it("adds entries in #representationGetters", function() {
                var getters = Object.keys(plugin.representationGetters);
                expect(getters).toEqual(['simplified', 'traditional', 'pinyin']);
            });

            it("generates getters functions", function() {
                var getSimplified = plugin.representationGetters.simplified;
                expect(getSimplified(reprs).writtenForm).toEqual("SIMPLIFIED");

                var getTraditional = plugin.representationGetters.traditional;
                expect(getTraditional(reprs).writtenForm).toEqual("TRADITIONAL");

                var getPinyin = plugin.representationGetters.pinyin;
                expect(getPinyin(reprs).writtenForm).toEqual("PINYIN");
            });


            describe("#detectRepresentation", function() {
                it("detects a representation matching multiple attributes", function() {
                    var attrs = {script: 'Latn', orthographyName: 'pinyin'};
                    var writtenForm = plugin.detectRepresentation(reprs, attrs).writtenForm

                    expect(writtenForm).toEqual('PINYIN');
                });
            });
        });

    });

})();
