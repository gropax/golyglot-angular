angular.module('golyglot.core').directive('ggDiffer', ggDiffer);

ggDiffer.$inject = ['$parse', '$log']

function ggDiffer($parse, $log) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if (!ctrl) {
                if(console && console.warn){
                    console.warn('Match validation requires ngModel to be on the element');
                }
                return;
            }
            
            var matchGetter = $parse(attrs['ggDiffer']);

            scope.$watch(getMatchValue, function(){
                ctrl.$$parseAndValidate();
            });

            ctrl.$validators.match = function(){
                return ctrl.$viewValue !== getMatchValue();
            };

            function getMatchValue(){
                var match = matchGetter(scope);
                if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
                    match = match.$viewValue;
                }
                return match;
            }
        }
    };
}
