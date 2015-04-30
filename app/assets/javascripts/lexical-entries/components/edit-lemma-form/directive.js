angular.module('golyglot.lexical-entries').directive('ggEditLemmaForm', ggEditLemmaForm);

function ggEditLemmaForm() {
    return {
        restrict: 'EA',
        scope: {
            langCode: '=',
            original: '=model',
            onSuccess: '&',
        },
        templateUrl: 'lexical-entries/components/edit-lemma-form/template.html',

        controller: function($scope, Lemma) {
            // Duplicate not to modify the original
            $scope.model = $scope.original.clone();

            $scope.representations = $scope.original.clone().representations;

            $scope.submit = function() {
                if (!$scope.valid) { return false; }

                updateLemma().then(function(result) {
                    // Replace the old one by the new
                    $scope.original = new Lemma(result);
                    // Execute callback function
                    $scope.onSuccess();
                }, function(error) {
                    // handle errors
                });
            };


            $scope.$watch('representations', function(reprs) {
                var blank = true,
                    ident = true;

                forEachRepresentation(function(newRepr, oldRepr) {
                    ident = ident && (newRepr.writtenForm === oldRepr.writtenForm);
                    blank = blank && (newRepr.writtenForm === "");
                }, function(newRepr) {
                    blank = blank && (newRepr === "");
                });

                $scope.valid = !blank && !ident;
            });


            function updateLemma() {
                var reqReprs = [];

                forEachRepresentation(function(newRepr, oldRepr) {
                // New repr match a old one
                    if (newRepr.writtenForm === "") {
                        // Delete
                        reqReprs.push({id: oldRepr.id, _destroy: "1"});
                    } else if (newRepr.writtenForm !== oldRepr.writtenForm) {
                        // Update
                        reqReprs.push({id: oldRepr.id, writtenForm: newRepr.writtenForm});
                    }
                // New repr do not match a old one
                }, function(newRepr) {
                    // Create
                    reqReprs.push(newRepr);
                });

                var lemma =  new Lemma({
                    id: $scope.original.id,
                    lexicalEntryId: $scope.original.lexicalEntryId,
                    representations: reqReprs,
                })

                return lemma.update();
            }


            function forEachRepresentation(match, noMatch) {
                for (var i = 0 ; i < $scope.representations.length ; i++) {
                    var newRepr = $scope.representations[i];

                    // Fetch correponding repr in original object
                    var correspondingRepr = undefined;
                    for (var j = 0 ; j < $scope.original.representations.length ; j++) {
                        var oldRepr = $scope.original.representations[j];

                        if (newRepr.orthographyName === oldRepr.orthographyName) {
                            correspondingRepr = oldRepr;
                            break;
                        }
                    }

                    if (correspondingRepr) {
                        match.call(this, newRepr, correspondingRepr);
                    } else {
                        noMatch.call(this, newRepr);
                    }
                }
            }

        }
    };
}
