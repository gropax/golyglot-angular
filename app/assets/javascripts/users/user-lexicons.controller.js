angular.module('golyglot.users').controller('UserLexiconsCtrl', UserLexiconsCtrl);

UserLexiconsCtrl.$inject = ['$scope', '$stateParams', 'Lexicon'];

function UserLexiconsCtrl($scope, $stateParams, Lexicon) {
    $scope.searching = true;
    $scope.lexicons = [];

    Lexicon.get({userId: $stateParams.id}).then(function(result) {
        $scope.lexicons = result;
        $scope.searching = false;
    }, function(error) {
        $scope.searching = false;
        // @todo Handle error
    });
}
