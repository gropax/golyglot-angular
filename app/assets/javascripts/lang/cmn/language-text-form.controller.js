angular.module('golyglot.lang.cmn').controller('cmnLanguageTextFormCtrl', cmnLanguageTextFormCtrl);

cmnLanguageTextFormCtrl.$inject = ['$scope', 'Representation'];

function cmnLanguageTextFormCtrl($scope, Representation) {
    $scope.simplified = new Representation({script: 'Hans', orthographyName: 'simplified'});
    $scope.traditional = new Representation({script: 'Hant', orthographyName: 'traditional'});
    $scope.pinyin = new Representation({script: 'Latn', orthographyName: 'pinyin'});

    $scope.$watch('representations', function() {
        $scope.representations.push($scope.simplified, $scope.traditional, $scope.pinyin);
    });
}
