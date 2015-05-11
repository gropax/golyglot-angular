angular.module('golyglot.lang.cmn').controller('CmnRepresentableInputCtrl', CmnRepresentableInputCtrl);

CmnRepresentableInputCtrl.$inject = ['$scope', 'Representation', 'lang', '$log'];

function CmnRepresentableInputCtrl($scope, Representation, lang, $log) {

    angular.forEach(lang('cmn').representations, function(reprSchema) {
        var name = reprSchema.orthographyName;

        // Find the correponding representation in the scope or create a new one
        var matchedRepr = reprSchema.detect($scope.representations)
        $scope[name] = matchedRepr || new reprSchema();

        // Trigger an event upward when the form is edited (eg. to update form validity)
        $scope.$watch(name + '.writtenForm', function() {
            $scope.$emit('form:modified');
        });
    });
}
