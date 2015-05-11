(function() {
    "use strict";

    describe('ggRepresentableInput', function() {
        var $httpBackend, $scope, lang, element, isolated;

        beforeEach(module("golyglot.lang", function ($provide) {
            var mockLang = function(code) {
                return {
                    component: function (name) {
                        return 'lang/' + code + '/components/' + name + '/template.html';
                    }
                };
            };
            $provide.value("lang", mockLang);
        }));

        beforeEach(function() {
            module('golyglot.representables');

            inject(function($rootScope, $compile, _$httpBackend_, _lang_) {
                // Create and populate $scope
                $scope = $rootScope.$new();
                lang = _lang_;
                $scope.language = lang('cmn');
                // Create HTML code using the directive
                element = '<div gg-representable-input language="language"></div>';

                // Expect request to fetch template
                $httpBackend = _$httpBackend_;
                $httpBackend.whenGET('representables/components/representable-input/template.html').respond(200, '');

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


        describe("#langComponent", function() {
            it("should be updated when $scope.language changes", function() {
                expect($scope.langComponent).toEqual('lang/cmn/components/representableInput/template.html');
                $scope.language = lang('eng');
                $scope.$digest();
                expect($scope.langComponent).toEqual('lang/eng/components/representableInput/template.html');
            });
        });
        
    });
})();
