(function() {
    "use strict";

    describe("languageService", function() {
        var languageService;

        beforeEach(module("golyglot.core"));

        var languageService,
            LanguagePlugin;

        beforeEach(inject(function(_LanguagePlugin_, _languageService_) {
            LanguagePlugin = _LanguagePlugin_;
            languageService = _languageService_;
        }));


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
                var plugin = new LanguagePlugin('cmn');
                plugin.representations({
                    simplified: {script: 'Hans'},
                    traditional: {script: 'Hant'},
                    pinyin: {script: 'Latn', orthographyName: 'pinyin'},
                });
                languageService.registerPlugin(plugin);
                languageService.importHelpersIn($scope);
            });

            it("generates working getter functions", function() {
                expect($scope.simplified()).toEqual('SIMPLIFIED');
                expect($scope.traditional()).toEqual('TRADITIONAL');
                expect($scope.pinyin()).toEqual('PINYIN');
            });

        });


        describe("#defaultConfig", function() {
            beforeEach(function() {
                var xxx = new LanguagePlugin('xxx');
                xxx.defaultConfig = {bougle: "bigle", trugle: 123};
                languageService.registerPlugin(xxx);

                var yyy = new LanguagePlugin('yyy');
                yyy.defaultConfig = {auie: "nrst", jldv: 456};
                languageService.registerPlugin(yyy);
            });

            it("return config for all registered plugins", function() {
                var expected = {
                    xxx: {bougle: "bigle", trugle: 123},
                    yyy: {auie: "nrst", jldv: 456}
                };
                expect(languageService.defaultConfig()).toEqual(expected); 
            });
        });

        describe("#availableLanguages", function() {
            beforeEach(function() {
                var cmn = new LanguagePlugin('cmn', 'Mandarin');
                languageService.registerPlugin(cmn);

                var fra = new LanguagePlugin('fra', 'French');
                languageService.registerPlugin(fra);
            });

            it("return a list of all registered language plugins", function() {
                var expected = [
                    {code: 'cmn', name: 'Mandarin'},
                    {code: 'fra', name: 'French'},
                ]
                expect(languageService.availableLanguages()).toEqual(expected); 
            });
        });

    });
})();
