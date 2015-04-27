angular.module('golyglot.lang.cmn').controller('cmnLanguageTextFormCtrl', cmnLanguageTextFormCtrl);

cmnLanguageTextFormCtrl.$inject = ['$scope', 'Representation', 'lang', '$log'];

function cmnLanguageTextFormCtrl($scope, Representation, lang, $log) {

    // @todo
    //     Should find existing repr first, and create only if not found
    //
    // @example
    //     $scope.simplified = lang('cmn').representation('simplified').findOrCreate($scope.model);
    //
    $scope.simplified = new Representation({script: 'Hans', orthographyName: 'simplified'});
    $scope.traditional = new Representation({script: 'Hant', orthographyName: 'traditional'});
    $scope.pinyin = new Representation({script: 'Latn', orthographyName: 'pinyin'});

    //$scope.model.representations = [];

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
            $log.debug('representations reset !!');
            $scope.model.representations = reprs;
        })
    })
}
