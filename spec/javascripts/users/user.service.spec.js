(function() {
    "use strict";

    describe("User", function() {
        beforeEach(module("golyglot.users"));

        var $httpBackend, User;

        beforeEach(inject(function(_$httpBackend_, _User_) {
            $httpBackend = _$httpBackend_;
            User = _User_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var userAttrs = {
            id: "123",
            name: "bob",
            email: "bob@doe.com",
        };


        describe("::get", function() {
            it("should GET /api/users with params", function() {
                $httpBackend.expectGET('api/users?name=bob').respond(200);
                User.get({name: 'bob'});
                $httpBackend.flush();
            });

            it("should return a User object", function() {
                $httpBackend.whenGET('api/users?name=bob').respond(200, userAttrs);
                var bob = User.get({name: 'bob'});
                $httpBackend.flush();
                expect(bob.name).toEqual('bob');
            });
        });


    });
})();
