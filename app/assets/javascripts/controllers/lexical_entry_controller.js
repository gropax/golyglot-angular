angular.module('golyglot').controller('LexicalEntryCtrl', LexicalEntryCtrl);


function LexicalEntryCtrl($scope, _, lang) {
    $scope.test = "Lexical Entry Controller";

    $scope.lexicalEntry = {
        "language": "cmn",

        "type": "word",
        "partOfSpeech": "adverb",

        "lemma": {
          "representations": [
            {
              "script": "Hans",
              "orthographyName": "simplified",
              "writtenForm": "白"
            },
            {
              "script": "Hant",
              "orthographyName": "traditional",
              "writtenForm": "白"
            },
            {
              "script": "Latn",
              "orthographyName": "pinyin",
              "writtenForm": "bai2"
            }
          ]
        },

        "senses": [
          {
            "equivalents": [  // Embedded
              {
                "language": "eng",
                "representations": [
                  {
                    "script": "Latn",
                    "writtenForm": "in vain"
                  }
                ]
              },
              {
                "language": "eng",
                "representations": [
                  {
                    "script": "Latn",
                    "writtenForm": "for nothing"
                  }
                ]
              },
            ],

            "definitions": [], // Not necessary in that example
                               // Same format as equivalents

            "sentences": [ // Reference
              {
                "language": "cmn",
                "representations": [
                  {
                    "script": "Hans",
                    "orthographyName": "simplified",
                    "writtenForm": "我的活儿全白干了。"
                  },
                  {
                    "script": "Hant",
                    "orthographyName": "traditional",
                    "writtenForm": "我的活兒全白干了。"
                  },
                  {
                    "script": "Latn",
                    "orthographyName": "pinyin",
                    "writtenForm": "wo3 de huor2 quan2 bai2 gan4 le."
                  }
                ],
                "translations": [
                  {
                    "language": "eng",
                    "representations": [
                      {
                        "script": "Latn",
                        "writtenForm": "All my work was wasted."
                      }
                    ]
                  },
                  {
                    "language": "fra",
                    "representations": [
                      {
                        "script": "Latn",
                        "writtenForm": "Tout mon travail a été gâché."
                      }
                    ]
                  },
                ]
              },


              {
                "language": "cmn",

                "representations": [
                  {
                    "script": "Hans",
                    "orthographyName": "simplified",
                    "writtenForm": "烈士们的鲜血没有白流。"
                  },
                  {
                    "script": "Hant",
                    "orthographyName": "traditional",
                    "writtenForm": "烈士們的鮮血沒有白流。"
                  },
                  {
                    "script": "Latn",
                    "orthographyName": "pinyin",
                    "writtenForm": "lie4shi4men de xian1xue4 mei2you3 bai2 liu2."
                  }
                ],

                "translations": [
                  {
                    "language": "fra",
                    "representations": [
                      {
                        "script": "Latn",
                        "writtenForm": "Le sang des martyrs n'a pas été versé en vain."
                      }
                    ]
                  },
                ]

              }
            ]

          }
        ]
    };

    var language = $scope.lexicalEntry.language;
    var langModule = lang[language] || lang.std;

    $scope.lang = lang;
    $scope.lemmaTemplate = langModule.lemmaTemplate;


    $scope.english = lang.eng.english;

    $scope.partOfSpeech = $scope.lexicalEntry.partOfSpeech;

    $scope.translation = function(sent, lang) {
        return _.detect(sent.translations, function(t) {
            return t.language === lang; 
        });
    };

    $scope.englishEquivalents = function(eqs) {
        var engEqs = _.select(eqs, function(eq) { return eq.lenguage === 'eng'; });

        return _.map(engEqs, $scope.english).join('; ');
    };

    $scope.englishTranslation = function(sent) {
        var trans = $scope.translation(sent, "eng");

        return trans ? $scope.english(trans) : "No translation in English";
    };

};

