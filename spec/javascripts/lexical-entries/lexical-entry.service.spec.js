(function() {
    "use strict";

    describe("LexicalEntry", function() {
        beforeEach(module("golyglot.lexical-entries"));

        var $rootScope, $httpBackend, LexicalEntry, Lemma, Representation;

        beforeEach(inject(function(_$rootScope_, _$httpBackend_, _LexicalEntry_, _Lemma_, _Representation_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            LexicalEntry = _LexicalEntry_;
            Lemma = _Lemma_;
            Representation = _Representation_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var reprAttrs = {
            id: '789',
            script: "Hans",
            orthographyName: "simplified",
            writtenForm: 'xx'
        };

        var lexicalEntryAttrs = {
            id: '456',
            lexiconId: '007',
            language: 'cmn',
            lemma: {
                id: '123',
                representations: [reprAttrs]
            }
        };

        var lexicalEntry, lemma;
        beforeEach(function() {
            lexicalEntry = new LexicalEntry(lexicalEntryAttrs);
            lemma = lexicalEntry.lemma;
        });


        describe("constructor", function() {
            it("should be idempotent", function() {
                var newLexicalEntry = new LexicalEntry(lexicalEntry);
                expect(newLexicalEntry).toEqual(lexicalEntry);
            });
        });

        describe("::get", function() {
            describe("when success", function() {
                it("should return the LexicalEntry", function() {
                    $httpBackend.expectGET('api/lexicons/007/lexical_entries/456')
                        .respond(200, lexicalEntryAttrs);

                    var value;
                    LexicalEntry.get({lexiconId: "007", id: "456"})
                        .then(function(success) { value = success; });

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(value).toEqual(lexicalEntry);
                });
            });
        });

        describe("::query", function() {
            describe("when success", function() {
                it("should return an array of `LexicalEntry`s", function() {
                    $httpBackend.expectGET('api/lexicons/007/lexical_entries?language=cmn')
                        .respond(200, [lexicalEntryAttrs]);

                    var value;
                    LexicalEntry.query({lexiconId: "007"}, {language: "cmn"})
                        .then(function(success) { value = success; });

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(value).toEqual([lexicalEntry]);
                });
            });
        });

        describe("#create", function() {
            describe("when success", function() {
                var newLexicalEntryAttrs;

                beforeEach(function() {
                    newLexicalEntryAttrs = {
                        lexiconId: '007',
                        language: 'cmn',
                        lemma: { representations: [reprAttrs] }
                    };
                });

                it("should create a new LexicalEntry", function() {
                    var newLexicalEntry = new LexicalEntry(newLexicalEntryAttrs);

                    $httpBackend.expectPOST('api/lexicons/007/lexical_entries', newLexicalEntryAttrs)
                        .respond(200, lexicalEntryAttrs);

                    var value;
                    newLexicalEntry.create().then(function(success) { value = success; });

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(value).toEqual(lexicalEntry);
                });

                it("should not send empty Representation", function() {
                    // Add a new blank Representation to attributes
                    var rawLexicalEntryAttrs = {
                        lexiconId: '007',
                        language: 'cmn',
                        lemma: { representations: [
                            reprAttrs,
                            {script: 'Fake', orthographyName: 'empty'}
                        ]}
                    };
                    var newLexicalEntry = new LexicalEntry(rawLexicalEntryAttrs);

                    // Expect request without the blank Representation
                    $httpBackend.expectPOST('api/lexicons/007/lexical_entries', newLexicalEntryAttrs)
                        .respond(200, lexicalEntryAttrs);

                    newLexicalEntry.create();
                    $httpBackend.flush();
                });
            });
        });

        describe("#destroy", function() {
            describe("when success", function() {
                it("should send a DELETE request", function() {
                    $httpBackend.expectDELETE('api/lexicons/007/lexical_entries/456').respond(200);

                    var callback;
                    lexicalEntry.destroy().then(function(success) { callback = 'called!'; });

                    $httpBackend.flush();
                    $rootScope.$digest();

                    expect(callback).toEqual('called!');
                });
            });
        });

        describe("#lemma", function() {
            it("returns a Lemma resource", function() {
                expect(lemma.constructor).toEqual(Lemma);
            });

            describe("when created empty", function() {
                beforeEach(function() {
                    lexicalEntry = new LexicalEntry({});
                    lemma = lexicalEntry.lemma;
                });

                it("returns an empty lemma", function() {
                    expect(lemma.constructor).toEqual(Lemma);
                    expect(lemma.isBlank()).toBe(true);
                });
            });

            describe("when new object with data", function() {
                it("returns the original data", function() {
                    var repr = lemma.representations.toArray()[0];
                    expect(repr.writtenForm).toEqual('xx');
                });
            });
        });

        describe("#setAttributes", function() {
            beforeEach(function() {
                lexicalEntry.setAttributes({
                    id: 'abc',
                    lexiconId: 'def',
                    language: 'eng',
                    lemma: {id: 'ghi'}
                });
            });

            it("should overwrite simple properties", function() {
                expect(lexicalEntry.id).toEqual('abc');
                expect(lexicalEntry.lexiconId).toEqual('def');
                expect(lexicalEntry.language).toEqual('eng');
            });

            it("should update lemma reference", function() {
                expect(lexicalEntry.lemma).toBe(lemma);
                expect(lexicalEntry.lemma.id).toEqual('ghi');
            });
        });

        describe("#serialize", function() {
            describe("without options", function() {
                it("should return this' data as an Object", function() {
                    expect(lexicalEntryAttrs.lemma.lexicalEntry).toBeUndefined();
                    expect(lexicalEntry.serialize()).toEqual(lexicalEntryAttrs);
                });
            });

            describe("with options", function() {
                it("should propagate options to lemma", function() {
                    lemma.representations.push(new Representation({script: 'Fake'}));
                    var obj = lexicalEntry.serialize({excludeEmptyRepresentations: true});
                    expect(obj.lemma).toEqual(lexicalEntryAttrs.lemma);
                });
            });
        });

        describe("#clone", function() {
            it("should return a clone", function() {
                var clone = lexicalEntry.clone();
                expect(clone).toEqual(lexicalEntry);
                expect(clone).not.toBe(lexicalEntry);
            });
        });

    });
})();
