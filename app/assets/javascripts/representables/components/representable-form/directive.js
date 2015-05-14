angular.module('golyglot.representables').directive('ggRepresentableForm', ggRepresentableForm);

function ggRepresentableForm() {
    return {
        restrict: 'EA',
        scope: {
            // Provide fallback `language` if not contained in representable (like in lemma) 
            //language: '=ggLanguage', 
            original: '=ggModel',
            onSuccess: '&ggSuccess',
        },
        templateUrl: 'representables/components/representable-form/template.html',

        controller: function($scope, lang) {

            // Make `language` available in the child scopes
            $scope.$watch('original', function() {
                $scope.language = lang($scope.original.language);
                $scope.representable = $scope.original.clone();
            });

            // Watch event from above (eg. when modal opens)
            $scope.$on('reset:form', function() {
                $scope.clearForm();
            });

            $scope.$on('form:modified', function() {
                $scope.updateValidity();
            });

            $scope.submit = function() {
                if ($scope.valid) {
                    $scope.representable.create().then(function(result) {
                        // Update the model
                        $scope.original = new $scope.representable.constructor(result);
                        // Execute callback function
                        $scope.onSuccess();
                    }, function(error) {
                        // handle errors
                    });
                }
            };

            $scope.updateValidity = function() {
                $scope.valid = !$scope.representable.isBlank();
            };

            // @todo
            $scope.clearForm = function() {};

        },
    };
}
