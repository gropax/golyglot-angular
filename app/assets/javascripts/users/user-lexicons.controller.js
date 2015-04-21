angular.module('golyglot.users').controller('UserLexiconsCtrl', UserLexiconsCtrl);

UserLexiconsCtrl.$inject = ['$scope', 'Lexicon'];

function UserLexiconsCtrl($scope, Lexicon) {
    $scope.searching = true;
    $scope.lexicons = [];

    Lexicon.query().then(function(result) {
        $scope.lexicons = result;
        $scope.searching = false;
    }, function(error) {
        $scope.searching = false;
        // @todo Handle error
    });
}
