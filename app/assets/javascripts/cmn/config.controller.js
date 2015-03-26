angular.module('golyglot.cmn').controller('CmnConfigCtrl', CmnConfigCtrl);

// @todo 
//     Restrict language config access at directive level.
//
function CmnConfigCtrl($scope) {
    $scope.cmnConfig = $scope.langConfig.cmn;
};

