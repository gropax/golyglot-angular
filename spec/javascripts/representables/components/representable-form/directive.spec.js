(function() {
    "use strict";

    describe('ggRepresentableForm', function() {
        var $httpBackend, $scope, lang, Representable, Representation, element, isolated;


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
            module('golyglot.representables');

            inject(function($rootScope, $compile, _$httpBackend_, _Representable_, _Representation_) {
                Representable = _Representable_;
                Representation = _Representation_;
                // Create and populate $scope
                $scope = $rootScope.$new();
                $scope.representable = new Representable({language: 'cmn'});
                $scope.callback = function() {};

                // Create HTML code using the directive
                element = '<div gg-representable-form gg-model="representable" gg-success="callback()"></div>';

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('representables/components/representable-form/template.html').respond(200, '');

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

            // EVENTS

            describe("$on reset:form", function() {
                it("should called #clearForm", function() {
                    spyOn(isolated, 'clearForm');
                    isolated.$apply(function() { isolated.$emit('reset:form'); });
                    expect(isolated.clearForm).toHaveBeenCalled();
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

            describe("#representations", function() {
                it("should be a clone of `$scope.model.representations`", function() {
                    expect(isolated.representations).toEqual(isolated.model.representations);
                    expect(isolated.representations).not.toBe(isolated.model.representations);
                });
            });            

            describe("#valid", function() {
                it("should be falsy at first", function() {
                    expect(!!isolated.valid).toBe(false);
                });
            });

            describe("#updateValidity", function() {
                it("should set valid to true if clone not blank", function() {
                    isolated.representations.push(new Representation({script: 'Hans', writtenForm: 'xxx'}));
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
                        $httpBackend.expectPOST().respond(200);

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

        });

        
    });
})();
