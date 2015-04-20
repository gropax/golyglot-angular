(function() {
    "use strict";

    describe("auth", function() {
        angular.module("golyglot.auth.test", [
            'ngMock',
            'golyglot.auth',
        ]);

        beforeEach(module("golyglot.auth.test"));
        
        var auth, store, $httpBackend, USER_ROLES;
        beforeEach(inject(function(_auth_, _store_, _$httpBackend_, _USER_ROLES_) {
            auth = _auth_;
            store = _store_;
            $httpBackend = _$httpBackend_;
            USER_ROLES = _USER_ROLES_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        describe("#authorize", function() {
            it("returns true if user has access", function() {
                var user = {admin: true};
                store.set('auth_token', {user: user});

                expect(auth.authorize(USER_ROLES.admin)).toBe(true);
            });

            it("returnrs false if user doesn't have rights", function() {
                store.remove('auth_token');
                expect(auth.authorize(USER_ROLES.user)).toBe(false);
            });
        });

        describe("#authenticated", function() {
            it("returns true if token in local storage", function() {
                store.set('auth_token', {});
                expect(auth.authenticated()).toBe(true);
            });

            it("returns false otherwise", function() {
                store.remove('auth_token');
                expect(auth.authenticated()).toBe(false);
            });
        });

        describe("#signUp", function() {
            it("post to /auth/sign_up.json", function() {
                $httpBackend.expectPOST("/auth/sign_up.json", {}).respond(200);
                auth.signUp({});
                $httpBackend.flush();
            });

            describe("with valid data", function() {
                var data;
                beforeEach(function() {
                    data = {
                        user: {id: 123, email: "john@doe.com"},
                        token: "Fake token for now."
                    };
                    $httpBackend.whenPOST("/auth/sign_up.json").respond(200, data);
                });

                it("save returned data in local storage", function() {
                    auth.signUp({}).then(function() {
                        expect(store.get('auth_token')).toEqual(data);
                    });
                    $httpBackend.flush();
                });
            });
        });

        describe("signIn", function() {
            it("posts to /auth/sign_in.json", function() {
                $httpBackend.expectPOST("/auth/sign_in.json", {}).respond(200);
                auth.signIn({});
                $httpBackend.flush();
            });

            describe("with valid data", function() {
                var data;
                beforeEach(function() {
                    data = {
                        user: {id: 123, email: "john@doe.com"},
                        token: "Fake token for now."
                    };
                    $httpBackend.whenPOST("/auth/sign_in.json").respond(200, data);
                });

                it("save returned data in local storage", function() {
                    auth.signIn({}).then(function() {
                        expect(store.get('auth_token')).toEqual(data);
                    });
                    $httpBackend.flush();
                });
            });
        });

        describe("signOut", function() {
            it("empty 'auth_token' in local storage", function() {
                store.set('auth_token', 'fake token');
                auth.signOut();
                expect(store.get('auth_token')).toBeNull();
            });
        });

        describe("currentUser", function() {
            describe("when admin user signed in", function() {
                beforeEach(function() {
                    var data = {
                        user: {id: 123, email: "john@doe.com", admin: true},
                    };
                    store.set('auth_token', data);
                });

                it("returns the user info with 'admin' rights", function() {
                    var user = auth.currentUser();
                    expect(user).toEqual({id: 123, email: "john@doe.com", role: USER_ROLES.admin});
                });
            });

            describe("when simple user signed in", function() {
                beforeEach(function() {
                    var data = {
                        user: {id: 123, email: "john@doe.com", admin: false},
                    };
                    store.set('auth_token', data);
                });

                it("returns the user info with 'user' rights", function() {
                    var user = auth.currentUser();
                    expect(user).toEqual({id: 123, email: "john@doe.com", role: USER_ROLES.user});
                });
            });

            describe("when not signed in", function() {
                beforeEach(function() {
                    store.remove('auth_token');
                });

                it("returns a 'guest' user", function() {
                    var user = auth.currentUser();
                    expect(user).toEqual({role: USER_ROLES.guest});
                });
            });
        });
    });
})();
