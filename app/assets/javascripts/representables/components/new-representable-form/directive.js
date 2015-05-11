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

            // Watch event from above (eg. when modal opens)
            $scope.$on('reset:form', function() {
                $scope.clearForm();
                // Clear form
            });

            // Clone the model not to modify it directly and expose its representations to form inputs in child scopes.
            var clone = $scope.model.clone();
            $scope.representations = clone.representations;

            $scope.$on('form:modified', function() {
                // Check validity
                $scope.valid = $scope.isValid();
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

            // @todo
            $scope.clearForm = function() {};

            //   Form is valid unless all fields are blank
            //
            $scope.isValid = function() {
                var reprs = $scope.representations,
                    allBlank = true;

                for (var i = 0 ; i < reprs.length ; i++) {
                    var repr = reprs[i];
                    console.log("repr: " + JSON.stringify(repr));
                    if (repr.writtenForm && repr.writtenForm !== '') {
                        allBlank = false;
                        break;
                    }
                }
                return !allBlank;
            };

        },
    };
}
