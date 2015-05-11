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
                element = '<div gg-edit-lemma-form lang-code="langCode" model="entry.lemma" on-success="callback()"></div>';
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


        var valid = {
            representations: [{id: "000", script: "Hans", orthographyName: "simplified", writtenForm: "XX"}, {id: "111", script: "Hant", orthographyName: "traditional", writtenForm: ""}, {id: "222", script: "Latn", orthographyName: "pinyin", writtenForm: "ni3hao3ma"}, {script: "IPA", orthographyName: "IPA", writtenForm: "ni214Xaw214ma"}],
            request: {lemma: {id: "789", lexical_entry_id: "123", representations: [{id: "111", _destroy: "1"}, {id: "222", written_form: "ni3hao3ma"}, {script: "IPA", orthography_name: "IPA", written_form: "ni214Xaw214ma"}]}},
            response: {lemma: {id: "789", lexical_entry_id: "123", representations: [{id: "000", script: "Hans", orthographyName: "simplified", writtenForm: "XX"}, {id: "222", script: "Latn", orthographyName: "pinyin", writtenForm: "ni3hao3ma"}, {id: "333", script: "IPA", orthography_name: "IPA", written_form: "ni214Xaw214ma"}]}},
        };

        var identical = {
            representations: [{id: "000", script: "Hans", orthographyName: "simplified", writtenForm: "XX"}, {id: "111", script: "Hant", orthographyName: "traditional", writtenForm: "YY"}, {id: "222", script: "Latn", orthographyName: "pinyin", writtenForm: "ni3hao3"}],
        };


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


            describe("#submit", function() {

                describe("when valid data", function() {
                    beforeEach(function() {
                        isolated.representations = valid.representations;
                        $scope.$digest();
                        $httpBackend.whenPUT('/api/lexical_entries/123/lemma', valid.request ).respond(200, valid.response);
                    });

                    it("should PUT /api/lexical_entries/:id/lemma", function() {
                        $httpBackend.expectPUT('/api/lexical_entries/123/lemma');
                        $scope.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();
                    });

                    it("should update the original", function() {
                        $scope.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();

                        var updatedLemma = new Lemma(valid.response.lemma);
                        expect($scope.entry.lemma).toEqual(updatedLemma);
                    });

                    it("should call the callback", function() {
                        $scope.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();
                        expect($scope.callback).toHaveBeenCalled();
                    });
                });

                describe("when invalid data", function() {
                    beforeEach(function() {
                        isolated.representations = identical.representations;
                    });

                    it("should not call the callback", function() {
                        $scope.$apply(function() { isolated.submit(); });
                        expect($scope.callback).not.toHaveBeenCalled();
                    });
                });

            });


            describe("#valid", function() {

                describe("when valid data", function() {
                    beforeEach(function() {
                        isolated.representations = valid.representations;
                        $scope.$digest();
                    });

                    it("should return `true`", function() {
                        expect(isolated.valid).toBe(true);
                    });
                });

                describe("when identical to original", function() {
                    beforeEach(function() {
                        isolated.representations = identical.representations;
                        $scope.$digest();
                    });

                    it("should return `false`", function() {
                        expect(isolated.valid).toBe(false);
                    });
                });

                var blank = {
                    representations: [{id: "000", script: "Hans", orthographyName: "simplified", writtenForm: ""}, {id: "111", script: "Hant", orthographyName: "traditional", writtenForm: ""}, {id: "222", script: "Latn", orthographyName: "pinyin", writtenForm: ""}],
                };

                describe("when all blank", function() {
                    beforeEach(function() {
                        isolated.representations = blank.representations;
                        $scope.$digest();
                    });

                    it("should return `false`", function() {
                        expect(isolated.valid).toBe(false);
                    });
                });

            });


        });

        describe("HTML", function() {

            describe("button", function() {
                it("should be disabled if form invalid", function() {
                    isolated.valid = false;
                    $scope.$digest();
                    expect(element.find('button').hasClass('disabled')).toBe(true);
                });

                it("should be enabled if form valid", function() {
                    isolated.valid = true;
                    $scope.$digest();
                    expect(element.find('button').hasClass('disabled')).toBe(false);
                });
            });

        });
        
    });
})();
