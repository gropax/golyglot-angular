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

            // Make `language` available in the child scopes
            $scope.$watch('original', function() {
                $scope.setEntities();
            });

            // Watch event from above (eg. when modal opens)
            $scope.$on('reset:form', function() {
                $scope.setEntities();
            });

            $scope.$on('form:modified', function() {
                $scope.updateValidity();
            });

            $scope.submit = function() {
                if ($scope.valid) {
                    $scope.model.create().then(function(result) {
                        // Update the model
                        //$scope.original = new $scope.model.constructor(result);
                        $scope.original.setAttributes(result.serialize());
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
            $scope.setEntities = function() {
                $scope.language = lang($scope.original.language);
                $scope.model = $scope.original.clone();
                $scope.representable = $scope.model.lemma;
            };

        },
    };
}
