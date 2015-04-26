angular.module('golyglot.lexicons').controller('LexiconSettingsCtrl', LexiconSettingsCtrl);

LexiconSettingsCtrl.$inject = ['$scope', '$state', 'user', 'lexicon', 'Lexicon', '$log'];

function LexiconSettingsCtrl($scope, $state, user, lexicon, Lexicon, $log) {
    $scope.newName = $scope.lexicon.name;

    $scope.renameLexicon = function() {
        var lex = new Lexicon(lexicon);    
        lex.name = $scope.newName;
        lex.update().then(function() {
            $state.go('lexicon.settings', {lexiconName: lex.name});
        }, function() {
            // @todo Handle errors
        });
    }

    $scope.deleteLexicon = function() {
        var lex = new Lexicon(lexicon);
        lex.remove().then(function() {
            $('#deleteLexiconModal').modal('hide');
            $state.go('user.lexicons', {userId: lexicon.userId});
        }, function() {
            // @todo Handle errors
        });
    };
}
