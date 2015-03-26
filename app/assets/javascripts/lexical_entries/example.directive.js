angular.module('golyglot').directive('example', example);

// @todo
//     Remove `lang` attribute: can be extracted from `sentence`.
//
function example() {
    return {
        restrict: 'E',

        scope: {
            language: "=lang",
            secondLanguage: "=secLang",
            sentence: "=value",
            langConfig: "=config"
        },

        template: "<sentence value='sentence' lang='language' config='langConfig'/><sentence value='translation()' lang='secondLanguage' config='langConfig'/>",

        controller: function($scope) {

            $scope.translation = function () {
                return pickTranslationIn($scope.secondLanguage, $scope.sentence);
            };

            function pickTranslationIn(language, sentence) {
                return _.detect(sentence.translations, function(t) {
                    return t.language === language;
                });
            }

        }
    };
}
