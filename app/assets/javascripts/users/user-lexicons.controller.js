angular.module('golyglot.users').controller('UserLexiconsCtrl', UserLexiconsCtrl);

UserLexiconsCtrl.$inject = ['$scope', '$stateParams', 'Lexicon', 'user'];

function UserLexiconsCtrl($scope, $stateParams, Lexicon, user) {
    $scope.searching = true;
    $scope.lexicons = [];

    Lexicon.get({userId: user.id}).then(function(result) {
        $scope.lexicons = result;
        $scope.searching = false;
    }, function(error) {
        $scope.searching = false;
        // @todo Handle error
    });
}
