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
        var reprs = [];
        var model = $scope.representation.writtenForm;
        if (angular.isDefined(model) && model !== "")
            reprs.push(repr);

        $scope.model.representations = reprs;
    });
}
