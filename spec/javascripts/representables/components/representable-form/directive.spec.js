(function() {
    "use strict";

    describe('ggRepresentableForm', function() {
        var $httpBackend, $scope, lang, Representation, element, isolated;


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

            inject(function($q, $rootScope, $compile, _$httpBackend_, _Representation_) {
                Representation = _Representation_;

                // Mock Representable
                function Representable(args) {
                    var reprArgs = args || {};
                    this.language = reprArgs.language;
                    this.representations = [];
                }
                Representable.prototype.clone = function() {
                    return new Representable(angular.extend({}, this));
                };
                Representable.prototype.isBlank = function() {
                    return this.representations.length === 0;
                };
                Representable.prototype.create = function() {
                    return $q(function(resolve, reject) {
                        resolve(this);
                    });
                };

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
            it("should have an `original` =ggModel", function() {
                expect(isolated.original).toBe($scope.representable);
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

            describe("#representable", function() {
                it("should be a clone of original", function() {
                    expect(isolated.representable).toEqual(isolated.original);
                    expect(isolated.representable).not.toBe(isolated.original);
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
                        pending();

                        $httpBackend.expectPOST().respond(200);

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();
                    });

                    it("should update the original", function() {
                        pending();

                        $httpBackend.whenPOST().respond(200, {id: "123"});

                        isolated.$apply(function() { isolated.submit(); });
                        $httpBackend.flush();

                        expect(isolated.original.id).toBe("123")
                    });

                    it("should execute `onSuccess` callback", function() {
                        pending();

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
