angular.module('golyglot.core').directive('ggNewRepresentableForm', ggNewRepresentableForm);

function ggNewRepresentableForm() {
    return {
        restrict: 'EA',
        scope: {
            model: '=ggModel',
            onSuccess: '&ggSuccess',
        },
        templateUrl: 'components/new-lexical-entry-form/template.html',

        controller: function($scope, lang) {
            // Make `language` available in the child scopes
            $scope.language = lang($scope.model.language);

            // Watch event from above (eg. when modal opens)
            $scope.$watch('reset:form', function() {
                // Clear form
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
                    clone.create().then(function() {
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
