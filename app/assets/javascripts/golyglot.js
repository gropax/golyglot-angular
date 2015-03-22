var golyglot = angular.module('golyglot', [
    'templates',
    'ui.router',
    'ui.bootstrap',
    //'xeditable'
]);


golyglot.controller('HomeCtrl', function($scope) {
    $scope.bougle = "bandu !";
});

golyglot.controller('LexicalEntriesCtrl', function($scope) {
    $scope.bougle = "bandu !";
});


golyglot.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider.
        state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: 'HomeCtrl'
        }).
        state('lexical_entries', {
            url: '/lexical_entries',
            templateUrl: 'templates/lexical_entries.html',
            controller: 'LexicalEntriesCtrl'
        }).
        state('lexical_entry', {
            url: '/lexical_entry/:id',
            templateUrl: 'templates/lexical_entry.html',
            controller: 'LexicalEntryCtrl'
        });

    $urlRouterProvider.otherwise('/');

    // What is this ?
    //$locationProvider.html5Mode(true);
});


/* Setup Theme for xeditable module
 */
//golyglot.run(function(editableOptions) {
//    editableOptions.theme = 'bs3';
//});


