angular.module('golyglot.lang.cmn').controller('CmnRepresentableInputCtrl', CmnRepresentableInputCtrl);

CmnRepresentableInputCtrl.$inject = ['$scope', 'Representation', 'lang', '$log'];

function CmnRepresentableInputCtrl($scope, Representation, lang, $log) {

    $scope.$watch('representable', function() {
        $scope.setRepresentations();
    });

    $scope.setRepresentations = function() {
        angular.forEach(lang('cmn').representations, function(reprSchema) {
            var name = reprSchema.orthographyName;
            $scope[name] = $scope.representable.findOrCreateRepresentation(reprSchema);
            
            // Trigger an event upward when the form is edited (eg. to update form validity)
            $scope.$watch(name + '.writtenForm', function() {
                $scope.$emit('form:modified');
            });
        });
    };
}
