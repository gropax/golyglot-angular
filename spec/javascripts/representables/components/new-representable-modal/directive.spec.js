(function() {
    "use strict";

    describe('ggNewRepresentableModal', function() {
        var $rootScope, $scope, $httpBackend, Representable, element, isolated;

        // @fixme
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

            inject(function(_$rootScope_, $compile, _$httpBackend_, _Representable_) {
                // Create and populate $scope
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();

                // Create HTML code using the directive
                element = '<div gg-new-representable-modal></div>';

                Representable = _Representable_;

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('representables/components/new-representable-modal/template.html').respond(200, '');

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


        describe("controller", function() {

            describe("$watch `new:representable:modal:button:clicked`", function() {
                it("should call #openModal", function() {
                    var model = new Representable({language: 'cmn'});
                    var callback = function() {};
                    var args = {model: model, onSuccess: callback};

                    spyOn(isolated, 'openModal');
                    isolated.$apply(function() {
                        $rootScope.$broadcast('new:representable:modal:button:clicked', args);
                    });
                    expect(isolated.openModal).toHaveBeenCalledWith(args);
                });
            });

            describe("#openModal", function() {
                var model, callback;

                beforeEach(function() {
                    model = new Representable({language: 'cmn'});
                    callback = function() {};
                    var args = {model: model, onSuccess: callback};

                    isolated.openModal(args);
                });

                it("should set `model` and `buttonSuccessCallback`", function() {
                    expect(isolated.model).toBe(model);
                    expect(isolated.buttonSuccessCallback).toBe(callback);
                });

                it("should display modal", function() {
                    var modal = $('#newRepresentableModal');
                    expect(modal.css('display')).toBe('block');
                    pending();
                });
            });

            describe("#closeModal", function() {
                beforeEach(function() {
                    isolated.model = {};
                    isolated.buttonSuccessCallback = function() {};
                    isolated.closeModal();
                });

                it("should remove `model` and `buttonSuccessCallback`", function() {
                    expect(isolated.model).toBeUndefined();
                    expect(isolated.buttonSuccessCallback).toBeUndefined();
                });

                it("should close modal", function() {
                    var modal = $('#newRepresentableModal');
                    expect(modal.css('display')).toBe('none');
                    pending();
                });
            });

            describe("#onSuccess", function() {
            });

        });

        
    });
})();
