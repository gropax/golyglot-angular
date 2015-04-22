angular.module('golyglot.lexicons').controller('LexiconSettingsCtrl', LexiconSettingsCtrl);

LexiconSettingsCtrl.$inject = ['$scope', '$state', 'user', 'lexicon', 'Lexicon', '$log'];

function LexiconSettingsCtrl($scope, $state, user, lexicon, Lexicon, $log) {
    $scope.cleanUpModal = function() {
    }

    $scope.deleteLexicon = function() {
        var lex = new Lexicon(lexicon);
        lex.remove().then(function() {
            //$log.debug('delete Lexicon !');
            $('#deleteLexiconModal').modal('hide');
            $state.go('user.home.lexicons', {userId: lexicon.userId});
        }, function() {
            // @todo Handle errors
        });
    };
}
