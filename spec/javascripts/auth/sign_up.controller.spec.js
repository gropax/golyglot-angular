(function() {
    "use strict";

    describe("SignUpCtrl", function() {
        angular.module("golyglot.auth.test", [
            'ngMock',
            'golyglot.auth',
        ]);

        beforeEach(module("golyglot.auth.test"));

        var scope, createCtrl, $httpBackend, $state;

        beforeEach(inject(function($rootScope, $controller, _$httpBackend_, _$state_) {
            $httpBackend = _$httpBackend_;
            $state = _$state_;

            $state.go('guest.sign-up');
            scope = $rootScope.$new();

            createCtrl = function() {
                return $controller('SignUpCtrl', {
                    $scope: scope,
                });
            };
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        describe("signUp", function() {
            var ctrl, user;

            beforeEach(function() {
                user = {email: 'john@doe.com', password: 'gojohnnygo', passwordConfirmation: 'gojohnnygo', acceptTerms: true};
                scope.user = user;
                createCtrl();
            });

            it("POST to /auth/sign_up with user data", function() {
                $httpBackend.expectPOST('/auth/sign_up', user).respond(200);
                scope.signUp();
                $httpBackend.flush();
            });

            describe("signing up success", function() {
                it("redirects to /home page", function() {
                    spyOn($state, 'go');
                    $httpBackend.expectPOST('/auth/sign_up').respond(200);

                    scope.signUp().then(function() {
                        expect($state.go).toHaveBeenCalledWith('guest.home');
                    });
                    $httpBackend.flush();
                });
            });

            //describe("signing up failure", function() {
            //    it("displays errors in form", function() {
            //    });
            //});
        });

    });
})();
