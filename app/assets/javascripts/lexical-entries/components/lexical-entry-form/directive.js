angular.module('golyglot.lexical-entries').directive('ggLexicalEntryForm', ggLexicalEntryForm);

function ggLexicalEntryForm() {
    return {
        restrict: 'EA',
        scope: {
            original: '=ggModel',
            onSuccess: '&ggSuccess',
        },
        templateUrl: 'lexical-entries/components/lexical-entry-form/template.html',

        controller: function($scope, lang, $log) {

            var original;

            // Make `language` available in the child scopes
            $scope.$watch('original', function() {
                $scope.language = lang($scope.original.language);
                //$scope.language = $scope.model.language;

                $scope.model = $scope.original.clone();
                $scope.representable = $scope.model.lemma;
            });

            // Clone the model not to modify it directly and expose its representations to form inputs in child scopes.
            //var clone = $scope.model.clone();
            //$scope.representations = clone.lemma.representations;

            // Watch event from above (eg. when modal opens)
            $scope.$on('reset:form', function() {
                $scope.clearForm();
            });

            $scope.$on('form:modified', function() {
                $scope.updateValidity();
            });

            $scope.submit = function() {
                if ($scope.valid) {
                    $scope.model.create().then(function(result) {
                        // Update the model
                        $scope.original = new $scope.model.constructor(result);
                        // Execute callback function
                        $scope.onSuccess();
                    }, function(error) {
                        // handle errors
                    });
                }
            };

            $scope.updateValidity = function() {
                $scope.valid = !$scope.model.lemma.isBlank();
            };

            // @todo
            $scope.clearForm = function() {};

        },
    };
}
