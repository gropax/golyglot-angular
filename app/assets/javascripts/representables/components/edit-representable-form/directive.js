angular.module('golyglot.lexical-entries').directive('ggEditRepresentableForm', ggEditRepresentableForm);

function ggEditRepresentableForm() {
    return {
        restrict: 'EA',
        scope: {
            model: '=ggModel',
            onSuccess: '&ggSuccess',
        },
        templateUrl: 'lexical-entries/components/edit-representable-form/template.html',

        controller: function($scope, lang) {
            // Make `language` available in the child scopes
            $scope.language = lang($scope.model.language);

            // Watch event from above (eg. when modal opens)
            $scope.$watch('reset:form', function() {
                // Reset form with model data
            });

            // Clone the model not to modify it directly and expose its representations to form inputs in child scopes.
            var clone = $scope.model.clone();
            $scope.representations = clone.representations;

            $scope.$watch('form:modified', function() {
                // Check validity
                $scope.valid = isValid();
            })

            $scope.submit = function() {
                if ($scope.valid) {
                    clone.diffRequest().update().then(function() {
                        // Update the model
                        $scope.model = clone;
                        // Execute callback function
                        $scope.onSuccess();
                    }, function(error) {
                        // handle errors
                    });
                }
            };

            function isValid() {
                return false;
            }

        },
    };
}
