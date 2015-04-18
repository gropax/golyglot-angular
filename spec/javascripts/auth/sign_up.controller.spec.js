(function() {
    "use strict";

    describe("SignUpCtrl", function() {
        angular.module("golyglot.auth.test", [
            'ngMock',
            'golyglot.auth',
        ]);

        beforeEach(module("golyglot.auth.test"));

        var scope, createCtrl, $httpBackend, $state, $rootScope, AUTH_EVENTS;

        beforeEach(inject(function(_$rootScope_, $controller, _$httpBackend_, _$state_, _AUTH_EVENTS_) {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            $state = _$state_;
            AUTH_EVENTS = _AUTH_EVENTS_;

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

            it("POST to /auth/sign_up.json with user data", function() {
                $httpBackend.expectPOST('/auth/sign_up.json', user).respond(200);
                scope.signUp();
                $httpBackend.flush();
            });

            describe("signing up success", function() {
                beforeEach(function() {
                    var res = {user: {id: 123, email: 'john@doe.com'}, token: "123abc"};
                    $httpBackend.expectPOST('/auth/sign_up.json').respond(200, res);
                });

                it("redirects to /home page", function() {
                    spyOn($state, 'go');
                    scope.signUp().then(function() {
                        expect($state.go).toHaveBeenCalledWith('guest.home');
                    });
                    $httpBackend.flush();
                });

                // @todo
                //     Failed to test broadcasting due to error with `spyOn`.
                //
                //it("broadcast signUpSuccess event", function() {
                //    spyOn($rootScope, '$broadcast').andCallThrough();
                //    scope.signUp().then(function() {
                //        expect($rootScope.$broadcast).toHaveBeenCalledWith(AUTH_EVENTS.signUpSuccess);
                //    });
                //    $httpBackend.flush();
                //});
            });

            //describe("signing up failure", function() {
            //    it("displays errors in form", function() {
            //    });
            //});
        });

    });
})();
