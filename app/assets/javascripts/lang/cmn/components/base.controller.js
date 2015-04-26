angular.module('golyglot.lang.cmn').controller('CmnCtrl', CmnCtrl);

CmnCtrl.$inject = ['$scope', 'cmnSettings', '$log'];

function CmnCtrl($scope, cmnSettings, $log) {
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
