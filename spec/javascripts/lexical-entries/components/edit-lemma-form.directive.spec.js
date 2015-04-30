(function() {
    "use strict";

    describe('ggEditLemmaForm', function() {
        var $httpBackend, $scope, Lemma, element, isolated;

        beforeEach(function() {
            module('golyglot');

            inject(function($rootScope, $compile, _$httpBackend_, LexicalEntry, _Lemma_) {
                $httpBackend = _$httpBackend_;
                Lemma = _Lemma_;

                $scope = $rootScope.$new();
                // Create HTML code using the directive
                element = '<div gg-edit-lemma-form lang-code="langCode" model="entry.lemma" on-success="callback"></div>';
                // Populate the $scope with data
                $scope.langCode = 'cmn';

                $scope.callback = function() {};
                spyOn($scope, 'callback');

                $scope.entry = new LexicalEntry({
                    id: "123",
                    lexiconId: "456",
                    lemma: {
                        id: "789",
                        lexicalEntryId: "123",
                        representations: [
                            {
                                id: "000",
                                script: "Hans",
                                orthographyName: "simplified",
                                writtenForm: "XX",
                            },
                            {
                                id: "111",
                                script: "Hant",
                                orthographyName: "traditional",
                                writtenForm: "YY",
                            },
                            {
                                id: "222",
                                script: "Latn",
                                orthographyName: "pinyin",
                                writtenForm: "ni3hao3",
                            },
                        ]
                    }
                });

                // Compile the directive and link it to the scope
                element = $compile(element)($scope);
                // Must trigger a `$digest` before testing
                $scope.$digest();
                isolated = element.isolateScope();
            });
        });

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });



        describe("isolated scope", function() {
            describe("#representations", function() {
                it("should be a copy of the model lemma representations", function() {
                    var original = $scope.entry.lemma.representations;
                    var copy = isolated.representations;

                    expect(copy).toEqual(original);
                    copy[0].writtenForm = "Changed!";
                    expect(copy).not.toEqual(original);
                });    
            });

            describe("when valid data", function() {

                beforeEach(function() {
                    // Modify the representations copy as would the language form do.
                    isolated.representations = [
                        { // Untouched
                            id: "000",
                            script: "Hans",
                            orthographyName: "simplified",
                            writtenForm: "XX",
                        },
                        { // Emptied
                            id: "111",
                            script: "Hant",
                            orthographyName: "traditional",
                            writtenForm: "",
                        },
                        { // Modified
                            id: "222",
                            script: "Latn",
                            orthographyName: "pinyin",
                            writtenForm: "ni3hao3ma",
                        },
                        { // Added
                            script: "IPA",
                            orthographyName: "IPA",
                            writtenForm: "ni214Xaw214ma",
                        },
                    ];
                });

                describe("#submit", function() {
                    it("should PUT /api/lexical_entries/:id/lemma", function() {
                        $httpBackend.expectPUT('/api/lexical_entries/123/lemma', {
                            lemma: {
                                id: "789",
                                lexical_entry_id: "123",
                                representations: [
                                    {
                                        id: "111",
                                        _destroy: "1",
                                    },
                                    {
                                        id: "222",
                                        written_form: "ni3hao3ma",
                                    },
                                    {
                                        script: "IPA",
                                        orthography_name: "IPA",
                                        written_form: "ni214Xaw214ma",
                                    },
                                ]
                            }
                        }).respond(200);

                        $scope.$apply(function() {
                            isolated.submit();
                        });

                        $httpBackend.flush();
                    });

                    it("should update the original", function() {
                        var result = {
                            lemma: {
                                id: "789",
                                lexical_entry_id: "123",
                                representations: [
                                    {
                                        id: "000",
                                        script: "Hans",
                                        orthographyName: "simplified",
                                        writtenForm: "XX",
                                    },
                                    {
                                        id: "222",
                                        script: "Latn",
                                        orthographyName: "pinyin",
                                        writtenForm: "ni3hao3ma",
                                    },
                                    {
                                        id: "333",
                                        script: "IPA",
                                        orthography_name: "IPA",
                                        written_form: "ni214Xaw214ma",
                                    },
                                ]
                            }
                        };

                        $httpBackend.expectPUT('/api/lexical_entries/123/lemma').respond(200, result);

                        $scope.$apply(function() {
                            isolated.submit();
                        });

                        $httpBackend.flush();

                        var updatedLemma = new Lemma(result.lemma);
                        expect($scope.entry.lemma).toEqual(updatedLemma);
                    });

                    it("should call the callback", function() {
                        expect($scope.callback).toHaveBeenCalled();
                    });
                });

            });

        });

        describe("HTML", function() {
            describe("button's class", function() {
                it("should be disabled if form invalid", function() {
                });

                it("should be enabled if form valid", function() {
                });
            });
        });
        
    });
})();
