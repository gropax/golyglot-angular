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

    });
})();
