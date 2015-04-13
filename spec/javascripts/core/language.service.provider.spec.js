(function() {
    "use strict";

    describe("languageServiceProvider", function() {

        var languageServiceProvider,
            languageService,
            LanguagePlugin;

        beforeEach(function() {
            var test = angular.module('golyglot.core.test', function() {});
            test.config(function(_languageServiceProvider_) {
                
                languageServiceProvider = _languageServiceProvider_;
                LanguagePlugin = languageServiceProvider.LanguagePlugin;

                // Define and register Mandarin plugin
                var cmn = new LanguagePlugin('cmn', 'Mandarin');
                cmn.representations({
                    simplified: {script: 'Hans'},
                    traditional: {script: 'Hant'},
                    pinyin: {script: 'Latn', orthographyName: 'pinyin'},
                });
                cmn.partials = {
                    lemma: 'lang/cmn/partials/lemma.html',
                };
                cmn.defaultConfig = {charset: "traditional", showPinyin: true};

                languageServiceProvider.registerPlugin(cmn);

                // Define and register Arabic plugin
                var ara = new LanguagePlugin('ara', 'Arabic');
                ara.representations({
                    pointed: {script: 'Arab'},
                    unpointed: {script: 'Arab'},
                });
                ara.defaultConfig = {pointed: true};

                languageServiceProvider.registerPlugin(ara);

            });

            module('golyglot.core', 'golyglot.core.test');

            inject(function(_languageService_) {
                languageService = _languageService_;
            });
        });


        // @todo
        //
        describe("#registerPlugin", function() {});

        describe("#LanguagePlugin", function() {

            it("is initialized with a code and a name", function() {
                var plugin = new LanguagePlugin("cmn", "Mandarin");
                expect(plugin.code).toEqual('cmn');
                expect(plugin.name).toEqual('Mandarin');
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

            }); // #representations

        }); // #LanguagePlugin



        describe("#importHelpersIn", function() {
            var $scope = {
                language: 'cmn',
                form: {
                    formRepresentations: [
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
                    ]
                },
                config: {},
            };

            beforeEach(function() {
                languageService.importHelpersIn($scope);
            });

            it("generates working getter functions", function() {
                expect($scope.simplified()).toEqual('SIMPLIFIED');
                expect($scope.traditional()).toEqual('TRADITIONAL');
                expect($scope.pinyin()).toEqual('PINYIN');
            });

        });


        describe("#defaultConfig", function() {
            it("return config for all registered plugins", function() {
                var expected = {
                    cmn: {charset: "traditional", showPinyin: true},
                    ara: {pointed: true}
                };
                expect(languageService.defaultConfig()).toEqual(expected); 
            });
        });

        describe("#availableLanguages", function() {
            it("return a list of all registered language plugins", function() {
                var expected = [
                    {code: 'cmn', name: 'Mandarin'},
                    {code: 'ara', name: 'Arabic'},
                ]
                expect(languageService.availableLanguages()).toEqual(expected); 
            });
        });

        describe("#partial", function() {
            it("returns partial if provided by plugin", function() {
                expect(languageService.partial('cmn', 'lemma')).toEqual("lang/cmn/partials/lemma.html"); 
            });

            it("returns default partial if not provided by plugin", function() {
                expect(languageService.partial('ara', 'lemma')).toEqual("core/partials/lemma.html"); 
            });

            it("returns false if no default partial", function() {
                expect(languageService.partial('cmn', 'do-not-exist')).toBe(false);
            });
        });
    });
})();
