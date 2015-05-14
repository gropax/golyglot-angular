(function() {
    "use strict";

    describe("Lexicon", function() {
        beforeEach(module("golyglot.lexicons"));

        var $httpBackend, Lexicon;

        beforeEach(inject(function(_$httpBackend_, _Lexicon_) {
            $httpBackend = _$httpBackend_;
            Lexicon = _Lexicon_;
        }));

        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        var lexiconAttrs = {
            id: "123",
            userId: "456",
            name: "myVocabulary",
        };


        describe("::get", function() {
            it("should GET /api/users/:id/lexicons with params", function() {
                $httpBackend.expectGET('api/users/456/lexicons?name=myVocabulary').respond(200);
                Lexicon.get({userId: "456", name: 'myVocabulary'});
                $httpBackend.flush();
            });

            it("should return a Lexicon object", function() {
                $httpBackend.whenGET('api/users/456/lexicons?name=myVocabulary').respond(200, lexiconAttrs);
                var lexicon = Lexicon.get({userId: "456", name: 'myVocabulary'});
                $httpBackend.flush();
                expect(lexicon.name).toEqual('myVocabulary');
            });
        });


    });
})();
