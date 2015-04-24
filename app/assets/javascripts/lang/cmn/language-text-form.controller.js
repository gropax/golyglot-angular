angular.module('golyglot.lang.cmn').controller('cmnLanguageTextFormCtrl', cmnLanguageTextFormCtrl);

cmnLanguageTextFormCtrl.$inject = ['$scope', 'Representation', '$log'];

function cmnLanguageTextFormCtrl($scope, Representation, $log) {
    $scope.simplified = new Representation({script: 'Hans', orthographyName: 'simplified'});
    $scope.traditional = new Representation({script: 'Hant', orthographyName: 'traditional'});
    $scope.pinyin = new Representation({script: 'Latn', orthographyName: 'pinyin'});

    $scope.form.representations = [];

    // Watches representations to include in form's representations only those
    // who has a valid `writtenForm`.
    //
    angular.forEach(['simplified', 'traditional', 'pinyin'], function(reprName) {
        $scope.$watch(reprName + '.writtenForm', function() {
            var reprs = [];
            angular.forEach([$scope.simplified, $scope.traditional, $scope.pinyin], function(repr) {
                if (angular.isDefined(repr.writtenForm) && repr.writtenForm !== "")
                    reprs.push(repr);
            });
            $scope.form.representations = reprs;
        })
    })
}
