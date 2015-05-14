angular.module('golyglot.users').controller('UserLexiconsCtrl', UserLexiconsCtrl);

UserLexiconsCtrl.$inject = ['$scope', '$stateParams', 'Lexicon', 'user'];

function UserLexiconsCtrl($scope, $stateParams, Lexicon, user) {
    $scope.searching = true;

    $scope.lexicons = Lexicon.query({userId: user.id}, function() {
        $scope.searching = false;
    }, function(error) {
        $scope.searching = false;
        // @todo Handle error
    });
}
