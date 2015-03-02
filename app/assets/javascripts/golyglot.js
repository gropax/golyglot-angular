var golyglot = angular.module("golyglot", ["ui.bootstrap", "xeditable"]);

/* Setup Theme for xeditable module
 */
golyglot.run(function(editableOptions) {
    editableOptions.theme = "bs3";
});


golyglot.controller('TableCtrl', function($scope) {
    $scope.patterns = [
        {
            graphic: "[zhi]",
            phonetic: "zhi1",
            grammaticalCategory: "quantifier",
            meaning: "[quantifier for small animals]"
        },
        {
            graphic: "[zhi]",
            phonetic: "zhi3",
            grammaticalCategory: "adverb",
            meaning: "only"
        },
    ];
});
