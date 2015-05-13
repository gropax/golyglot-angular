(function() {
    "use strict";

    describe('ggLexicalEntryFormModal', function() {
        var $rootScope, $scope, $httpBackend, LexicalEntry, element, isolated;


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
            module('golyglot.lexical-entries');

            inject(function(_$rootScope_, $compile, _$httpBackend_, _LexicalEntry_) {
                // Create and populate $scope
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();

                // Create HTML code using the directive
                element = '<div gg-lexical-entry-form-modal></div>';

                LexicalEntry = _LexicalEntry_;

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('lexical-entries/components/lexical-entry-form-modal/template.html').respond(200, '');

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

            describe("$watch `lexical-entry:form:modal:button:clicked`", function() {
                it("should call #openModal", function() {
                    var model = new LexicalEntry({language: 'cmn'});
                    var callback = function() {};
                    var args = {model: model, onSuccess: callback};

                    spyOn(isolated, 'openModal');
                    isolated.$apply(function() {
                        $rootScope.$broadcast('lexical-entry:form:modal:button:clicked', args);
                    });
                    expect(isolated.openModal).toHaveBeenCalledWith(args);
                });
            });

            describe("#openModal", function() {
                var model, callback;

                beforeEach(function() {
                    model = new LexicalEntry({language: 'cmn'});
                    callback = function() {};
                    var args = {model: model, onSuccess: callback};

                    isolated.openModal(args);
                });

                it("should set `model` and `buttonSuccessCallback`", function() {
                    expect(isolated.model).toBe(model);
                    expect(isolated.buttonSuccessCallback).toBe(callback);
                });

                it("should display modal", function() {
                    var modal = $('#newLexicalEntryModal');
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
                    var modal = $('#newLexicalEntryModal');
                    expect(modal.css('display')).toBe('none');
                    pending();
                });
            });

            describe("#onSuccess", function() {
            });

        });

        
    });
})();
