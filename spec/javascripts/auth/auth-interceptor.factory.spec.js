(function() {
    "use strict";

    describe("authInterceptor", function() {
        angular.module("golyglot.auth.test", [
            'ngMock',
            'golyglot.auth',
        ]);

        beforeEach(module("golyglot.auth.test"));

        var $httpBackend, $http, store;
        beforeEach(inject(function(_$httpBackend_, _$http_, _store_) {
            $httpBackend = _$httpBackend_;
            $http = _$http_;
            store = _store_;
        }));


        describe("requests Authorization header", function() {
            var headers;

            afterEach(function() {
                $httpBackend.flush();
            });

            it('should send a token if user signed in', function() {
                store.set('auth_token', {token: "myFakeToken123"});

                $httpBackend.whenGET('/api-call', function(headers) {
                    expect(headers.Authorization).toEqual("myFakeToken123");
                    return true;
                }).respond(200);

                $http.get('/api-call');
            });

            it('should not send a token if none is set', function() {
                store.remove('auth_token');

                $httpBackend.whenGET('/api-call', function(headers) {
                    expect(headers.Authorization).toBeUndefined();
                    return true;
                }).respond(200);

                $http.get('/api-call');
            });
        });

        describe("response error events", function() {
            it("broadcasts unauthorized on 401", function() {
                $httpBackend.whenGET('/api-call').respond(401);
                $http.get('/api-call');
                // @todo spy on $rootScope.$broadcast
            });

            it("broadcasts forbidden on 403", function() {
                $httpBackend.whenGET('/api-call').respond(403);
                $http.get('/api-call');
                // @todo spy on $rootScope.$broadcast
            });
        });
    });
})();
