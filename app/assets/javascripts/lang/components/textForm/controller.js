angular.module('golyglot.core').controller('LanguageTextFormCtrl', LanguageTextFormCtrl);

LanguageTextFormCtrl.$inject = ['$scope', 'Representation', '$log'];

function LanguageTextFormCtrl($scope, Representation, $log) {
    $scope.form.representations = [];

    var defaultRepr = lang.defaultRepresentation($scope.language)
    $scope.representation = new Representation(defaultRepr);

    $scope.$watch('representation.writtenForm', function() {
        var reprs = [];
        var form = $scope.representation.writtenForm;
        if (angular.isDefined(form) && form !== "")
            reprs.push(repr);

        $scope.form.representations = reprs;
    });
}
