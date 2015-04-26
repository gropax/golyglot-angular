angular.module('golyglot.core').controller('LangTextFormCtrl', LanguageTextFormCtrl);

LanguageTextFormCtrl.$inject = ['$scope', 'lang', 'Representation', '$log'];

function LanguageTextFormCtrl($scope, lang, Representation, $log) {

    $scope.$watch('langCode', function() {
        // Reset the form's representations
        $scope.model.representations = [];

        // Fetch the default repr. for the new language
        var defaultRepr = lang($scope.langCode).defaultRepresentation;
        $scope.representation = new Representation(defaultRepr);

        $scope.reprName = defaultRepr.orthographyName;
    });

    $scope.$watch('representation.writtenForm', function() {
        $log.debug('writtenForm changed');

        var reprs = [];
        var w = $scope.representation.writtenForm;
        if (angular.isDefined(w) && w !== "")
            reprs.push($scope.representation);

        $scope.model.representations = reprs;
    });
}
