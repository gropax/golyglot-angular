(function() {
    "use strict";

    describe("StdRepresentableInputCtrl", function() {
        var $scope, ctrl;

        beforeEach(function() {
            module('golyglot.representables');
             
            inject(function($rootScope, $controller, Representable) {
                $scope = $rootScope.$new();
                //$scope.representations = [];
                $scope.representable = {
                    language: 'cmn',
                    representations: []
                };
                // Mock Language object
                $scope.language = {
                    defaultRepresentation: {script: 'Hans', orthographyName: 'simplified'}
                };

                ctrl = $controller('StdRepresentableInputCtrl', {$scope: $scope});

                // @fixme Run $digest to trigger the 'language' $watch, which occurs naturally in real conditions, and is necessary for setting `$scope.representation` at initialization.
                $scope.$digest();
            });
        });


        describe("$watch writtenForm", function() {
            it("should $emit form:modified", function() {
                spyOn($scope, '$emit');
                $scope.$apply(function() {
                    $scope.representation.writtenForm = "modified";
                });
                expect($scope.$emit).toHaveBeenCalledWith('form:modified');
            });
        });

        describe("$watch language", function() {
            it("should call #resetRepresentations", function() {
                spyOn($scope, 'resetRepresentations');
                $scope.$apply(function() {
                    $scope.language = { defaultRepresentation: {script: 'Arab', orthographyName: 'arabic'} };
                });
                expect($scope.resetRepresentations).toHaveBeenCalled();
            });
        });

        describe("#resetRepresentations", function() {
            var prevRepr, prevReprs;

            beforeEach(function() {
                prevReprs = $scope.representations;
                prevRepr = $scope.representation;
                $scope.$apply(function() { $scope.resetRepresentations(); });
            });

            it("should fill representations with a new representation", function() {
                var reprs = $scope.representable.representations;
                expect(reprs.length).toBe(1);
                expect(reprs[0]).not.toBe(prevRepr);
            });

            it("should keep the original representations object", function() {
                expect($scope.representations).toBe(prevReprs);
            });
        });

    });
})();
