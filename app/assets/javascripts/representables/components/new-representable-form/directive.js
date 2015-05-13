angular.module('golyglot.representables').directive('ggNewRepresentableForm', ggNewRepresentableForm);

function ggNewRepresentableForm() {
    return {
        restrict: 'EA',
        scope: {
            model: '=ggModel',
            onSuccess: '&ggSuccess',
        },
        templateUrl: 'representables/components/new-representable-form/template.html',

        controller: function($scope, lang) {

            // Make `language` available in the child scopes
            $scope.language = lang($scope.model.language);

            // Clone the model not to modify it directly and expose its representations to form inputs in child scopes.
            var clone = $scope.model.clone();
            $scope.representations = clone.representations;


            // Watch event from above (eg. when modal opens)
            $scope.$on('reset:form', function() {
                $scope.clearForm();
            });

            $scope.$on('form:modified', function() {
                $scope.updateValidity();
            });

            $scope.submit = function() {
                if ($scope.valid) {
                    clone.create().then(function(result) {
                        // Update the model
                        $scope.model = new clone.constructor(result);
                        // Execute callback function
                        $scope.onSuccess();
                    }, function(error) {
                        // handle errors
                    });
                }
            };

            $scope.updateValidity = function() {
                $scope.valid = !clone.isBlank();
            };

            // @todo
            $scope.clearForm = function() {};

        },
    };
}
