angular.module('golyglot.core').controller('StdRepresentableInputCtrl', StdRepresentableInputCtrl);

StdRepresentableInputCtrl.$inject = ['$scope', 'lang', 'Representation', '$log'];

function StdRepresentableInputCtrl($scope, lang, Representation, $log) {

    // Change the representation when the language is changed
    $scope.$watch('language', function() {
        $scope.resetRepresentations();
    });

    // Trigger an event upward when the field is edit (eg. to update form validity)
    $scope.$watch('representation.writtenForm', function() {
        $scope.$emit('form:modified');
    });

    $scope.resetRepresentations = function() {
        // @fixme Could use something like:
        //     $scope.representation = new language.defaultRepresentation();
        var defaultRepr = $scope.language.defaultRepresentation;
        $scope.representation = $scope.representable.representations.findOrCreate(defaultRepr);
    };
}
