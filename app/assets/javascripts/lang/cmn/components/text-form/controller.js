angular.module('golyglot.lang.cmn').controller('cmnLanguageTextFormCtrl', cmnLanguageTextFormCtrl);

cmnLanguageTextFormCtrl.$inject = ['$scope', 'Representation', 'lang', '$log'];

function cmnLanguageTextFormCtrl($scope, Representation, lang, $log) {

    $scope.simplified  = lang('cmn').representation('simplified').findOrCreate($scope.model);
    $scope.traditional = lang('cmn').representation('traditional').findOrCreate($scope.model);
    $scope.pinyin      = lang('cmn').representation('pinyin').findOrCreate($scope.model);

    $log.debug('simplified: ' + $scope.simplified.writtenForm);

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
            $scope.model.representations = reprs;
        })
    })
}
