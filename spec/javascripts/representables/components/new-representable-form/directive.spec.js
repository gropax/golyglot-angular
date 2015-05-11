(function() {
    "use strict";

    describe('ggNewRepresentableForm', function() {
        var $httpBackend, $scope, lang, Representable, Representation, element, isolated;

        beforeEach(module("golyglot.lang", function ($provide) {
            var mockLang = function(code) {
                return {
                    code: code
                };
            };
            $provide.value("lang", mockLang);
        }));

        beforeEach(function() {
            module('golyglot.representables');

            inject(function($rootScope, $compile, _$httpBackend_, _Representable_, _Representation_) {
                Representable = _Representable_;
                Representation = _Representation_;
                // Create and populate $scope
                $scope = $rootScope.$new();
                $scope.representable = new Representable({language: 'cmn'});
                $scope.callback = function() {};

                // Create HTML code using the directive
                element = '<div gg-new-representable-form gg-model="representable" gg-success="callback()"></div>';

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('representables/components/new-representable-form/template.html').respond(200, '');

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
            it("should have a `model` =attribute", function() {
                expect(isolated.model).toBe($scope.representable);
            });

            it("should have a `onSuccess` &attribute", function() {
                spyOn($scope, 'callback');
                expect(isolated.onSuccess.constructor).toBe(Function);
                isolated.onSuccess();
                expect($scope.callback).toHaveBeenCalled();
            });
        });

        describe("controller", function() {
            describe("#language", function() {
                it("should be `$scope.model`'s language", function() {
                    expect(isolated.language.code).toBe('cmn')
                });
            });            

            describe("#clearForm", function() {
                it("should be called on event `reset:form`", function() {
                    spyOn(isolated, 'clearForm');
                    isolated.$apply(function() {
                        isolated.$emit('reset:form');
                    });
                    expect(isolated.clearForm).toHaveBeenCalled();
                });
            });            

            describe("#representations", function() {
                it("should be a clone of `$scope.model.representations`", function() {
                    expect(isolated.representations).toEqual(isolated.model.representations);
                    expect(isolated.representations).not.toBe(isolated.model.representations);
                });
            });            

            describe("#valid", function() {
                it("should be updated on event `form:modified`", function() {
                    spyOn(isolated, 'isValid').and.returnValue('boolean');
                    isolated.$apply(function() {
                        isolated.$emit('form:modified');
                    });
                    expect(isolated.valid).toEqual('boolean');
                });
            });

            describe("#submit", function() {
                describe("when valid", function() {
                    beforeEach(function() {
                        isolated.valid = true;
                    });

                    it("should send a POST request", function() {
                        $httpBackend.expectPOST().respond(200);

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();
                    });

                    it("should update `model.representations`", function() {
                        $httpBackend.whenPOST().respond(200);

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();

                        expect(isolated.model.representations).toBe(isolated.representations)
                    });

                    it("should execute `onSuccess` callback", function() {
                        $httpBackend.whenPOST().respond(200);
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

            describe("#isValid", function() {
                it("should return false if representations is empty", function() {
                    isolated.representations = [];
                    expect(isolated.isValid()).toBe(false);
                });

                it("should return false if all representations are blank", function() {
                    isolated.representations = [
                        new Representation({script: 'a', orthographyName: 'b'}),
                        new Representation({script: 'c', orthographyName: 'd', writtenForm: ''}),
                    ];
                    expect(isolated.isValid()).toBe(false);
                });

                it("should return true if some representations are not blank", function() {
                    isolated.representations = [
                        new Representation({script: 'a', orthographyName: 'b'}),
                        new Representation({script: 'c', orthographyName: 'd', writtenForm: 'not blank'}),
                    ];
                    expect(isolated.isValid()).toBe(true);
                });
            });
        });

        
    });
})();
