(function() {
    "use strict";

    describe("CmnRepresentableInputCtrl", function() {
        angular.module('golyglot.lang.cmn.test', [
            'golyglot.lang.cmn',
            'golyglot.lexical-entries',
        ]);

        beforeEach(module("golyglot.lang.cmn.test"));

        var $scope, ctrl, Representation;

        beforeEach(function() {
            inject(function($rootScope, $controller, Lemma, _Representation_) {
                Representation = _Representation_;

                $scope = $rootScope.$new();

                $scope.representable = new Lemma({
                    language: 'cmn',
                    representations: [{
                        script: 'Hans',
                        orthographyName: 'simplified',
                        writtenForm: 'xxx',
                    }]
                });
                // Mock Language object
                $scope.language = {code: 'cmn'};

                ctrl = $controller('CmnRepresentableInputCtrl', {$scope: $scope});

                // @fixme Run $digest to trigger the 'language' $watch, which occurs naturally in real conditions, and is necessary for setting `$scope.representation` at initialization.
                $scope.$digest();
            });
        });


        describe("$watch representable", function() {
            it("should call #setRepresentations", function() {
                spyOn($scope, 'setRepresentations');
                $scope.$apply(function() {
                    $scope.representable = $scope.representable.clone();
                });
                expect($scope.setRepresentations).toHaveBeenCalled();
            });
        });

        describe("$watch writtenForms", function() {
            it("should $emit form:modified", function() {
                spyOn($scope, '$emit');
                $scope.$apply(function() {
                    $scope.representable.representations[0].writtenForm = "modified";
                });
                expect($scope.$emit).toHaveBeenCalledWith('form:modified');
            });
        });

        describe("#setRepresentations", function() {
            var prevRepr, prevReprs;

            beforeEach(function() {
                prevReprs = $scope.representations;
                prevRepr = $scope.representation;
                $scope.$apply(function() { $scope.setRepresentations(); });
            });

            it("should binds simplified representation to $scope.simplified", function() {
                expect($scope.simplified).toBe($scope.representable.representations[0]);
            });

            it("should binds new representations to $scope.pinyin and traditional", function() {
                expect($scope.traditional.constructor).toBe(Representation);
                expect($scope.pinyin.constructor).toBe(Representation);
            });

            it("should push new representations in $scope.representations", function() {
                var reprs = $scope.representable.representations;
                expect(reprs.length).toBe(3);
            });

            it("should keep the original representations object", function() {
                expect($scope.representations).toBe(prevReprs);
            });
        });

    });
})();
