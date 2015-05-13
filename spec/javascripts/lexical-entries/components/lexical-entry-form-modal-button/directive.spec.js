(function() {
    "use strict";

    describe('ggLexicalEntryFormModalButton', function() {
        var $rootScope, $scope, $httpBackend, element, isolated;

        beforeEach(function() {
            module('golyglot.lexical-entries');

            inject(function(_$rootScope_, $compile, _$httpBackend_, LexicalEntry) {
                // Create and populate $scope
                $rootScope = _$rootScope_;
                $scope = $rootScope.$new();

                $scope.lexicalEntry = new LexicalEntry({language: 'cmn'});
                $scope.callback = function() {};

                // Create HTML code using the directive
                element = '<div gg-lexical-entry-form-modal-button gg-model="lexicalEntry" gg-success="callback()"></div>';

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('lexical-entries/components/lexical-entry-form-modal-button/template.html').respond(200, '');

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
                expect(isolated.model).toBe($scope.lexicalEntry);
            });

            it("should have a `onSuccess` &attribute", function() {
                spyOn($scope, 'callback');
                expect(isolated.onSuccess.constructor).toBe(Function);
                isolated.onSuccess();
                expect($scope.callback).toHaveBeenCalled();
            });
        });

        describe("controller", function() {
            describe("#openModal", function() {
                it("should trigger a `lexical-entry:form:modal:button:clicked` event", function() {
                    pending();

                    spyOn($rootScope, '$broadcast');
                    isolated.$apply(function() { isolated.openModal(); });
                    expect($rootScope.$broadcast).toHaveBeenCalledWith(
                        'lexical-entry:form:modal:button:clicked', {
                            model: isolated.model,
                            onSuccess: isolated.onSuccess,
                    });
                });
            });
        });

        
    });
})();
