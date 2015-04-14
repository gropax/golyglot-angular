angular.module('golyglot.lang.cmn').controller('cmnCtrl', cmnCtrl);

cmnCtrl.$inject = ['$scope', 'cmnSettings', '$log'];

function cmnCtrl($scope, cmnSettings, $log) {
    $scope.cmnSettings = cmnSettings;

    $scope.charset = cmnSettings.charset;

    $scope.$watch('cmnSettings.charset', function(newVal) {
        $scope.charset = newVal;
    });

    $scope.showPinyin = cmnSettings.showPinyin;

    $scope.$watch('cmnSettings.showPinyin', function(newVal) {
        $scope.showPinyin = newVal;
    });
}
