(function() {
    "use strict";

    describe('ggLexicalEntryForm', function() {
        var $httpBackend, $scope, lang, LexicalEntry, Representation, element, isolated;


        beforeEach(module("golyglot.lang", function ($provide) {
            var mockLang = function(code) {
                return {
                    code: code,
                    component: function (name) {
                        return 'lang/' + code + '/components/' + name + '/template.html';
                    }
                };
            };
            $provide.value("lang", mockLang);
        }));


        beforeEach(function() {
            module('golyglot.lexical-entries');

            inject(function($rootScope, $compile, _$httpBackend_, _LexicalEntry_, _Representation_) {
                LexicalEntry = _LexicalEntry_;
                Representation = _Representation_;
                // Create and populate $scope
                $scope = $rootScope.$new();
                $scope.lexicalEntry = new LexicalEntry({language: 'cmn', lexiconId: '123'});
                $scope.callback = function() {};

                // Create HTML code using the directive
                element = '<div gg-lexical-entry-form gg-model="lexicalEntry" gg-success="callback()"></div>';

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('lexical-entries/components/lexical-entry-form/template.html').respond(200, '');

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


        var lexicalEntryAttrs = {
            id: '456',
            lexiconId: '007',
            language: 'cmn',
            lemma: {
                id: '123',
                representations: [{
                    id: '789',
                    script: "Hans",
                    orthographyName: "simplified",
                    writtenForm: 'xx'
                }]
            }
        };


        describe("isolated scope", function() {
            it("should have an `original` =ggModel", function() {
                expect(isolated.original).toBe($scope.lexicalEntry);
            });

            it("should have a `onSuccess` &attribute", function() {
                spyOn($scope, 'callback');
                expect(isolated.onSuccess.constructor).toBe(Function);
                isolated.onSuccess();
                expect($scope.callback).toHaveBeenCalled();
            });
        });

        describe("controller", function() {

            // EVENTS

            describe("$on reset:form", function() {
                it("should called #setEntities", function() {
                    spyOn(isolated, 'setEntities');
                    isolated.$apply(function() { isolated.$emit('reset:form'); });
                    expect(isolated.setEntities).toHaveBeenCalled();
                });
            });            

            describe("$on form:modified", function() {
                it("should call #updateValidity", function() {
                    spyOn(isolated, 'updateValidity');
                    isolated.$apply(function() { isolated.$emit('form:modified'); });
                    expect(isolated.updateValidity).toHaveBeenCalled();
                });
            });

            // FUNCTIONS

            describe("#language", function() {
                it("should be `$scope.model`'s language", function() {
                    expect(isolated.language.code).toBe('cmn')
                });
            });            

            describe("#model", function() {
                it("should be a clone of $scope.original", function() {
                    var lemma = isolated.model.lemma;
                    expect(isolated.model).toEqual(isolated.original);
                    expect(isolated.model).not.toBe(isolated.original);
                });
            });            

            describe("#representable", function() {
                it("should be the lemma of $scope.model", function() {
                    expect(isolated.representable).toBe(isolated.model.lemma);
                });
            });            

            describe("#valid", function() {
                it("should be falsy at first", function() {
                    expect(!!isolated.valid).toBe(false);
                });
            });

            describe("#updateValidity", function() {
                it("should set valid to true if clone not blank", function() {
                    var reprs = isolated.representable.representations;
                    reprs.push(new Representation({script: 'Hans', writtenForm: 'xxx'}));
                    isolated.$apply(function() { isolated.updateValidity(); });
                    expect(isolated.valid).toBe(true);
                });

                it("should set valid to false if clone is blank", function() {
                    isolated.representations = [];
                    isolated.$apply(function() { isolated.updateValidity(); });
                    expect(isolated.valid).toBe(false);
                });
            });

            describe("#submit", function() {
                describe("when valid", function() {
                    beforeEach(function() {
                        isolated.valid = true;
                    });

                    it("should send a POST request", function() {
                        $httpBackend.expectPOST('api/lexicons/123/lexical_entries').respond(200, lexicalEntryAttrs);

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();
                    });

                    it("should update `model.representations`", function() {
                        $httpBackend.whenPOST().respond(200, {id: "123"});

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();

                        expect(isolated.model.id).toBe("123")
                    });

                    it("should execute `onSuccess` callback", function() {
                        $httpBackend.whenPOST().respond(200, lexicalEntryAttrs);
                        spyOn(isolated, 'onSuccess');

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();

                        expect(isolated.onSuccess).toHaveBeenCalled();
                    });
                });

                describe("when invalid", function() {
                    it("should do nothing (do not send request)", function() {
                        isolated.valid = false;
                        isolated.$apply(function() { isolated.submit(); });
                    });
                });
            });

        });

        
    });
})();
