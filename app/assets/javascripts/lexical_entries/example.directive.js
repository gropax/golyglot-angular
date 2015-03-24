angular.module('golyglot').directive('example', example);

function example() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            secondLanguage: "=secLang",
            sentence: "=value",
        },

        //template: "Sentence: {{ sentence }} ; Translation: {{ translation }}",
        template: "<sentence value='sentence' lang='language' /><sentence value='translation' lang='secondLanguage' />",

        controller: function($scope) {
            $scope.translation = pickTranslationIn($scope.secondLanguage, $scope.sentence);

            function pickTranslationIn(language, sentence) {
                return _.detect(sentence.translations, function(t) {
                    return t.language === language;
                });
            }
        }
    };
}
