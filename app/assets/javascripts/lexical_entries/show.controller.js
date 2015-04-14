angular.module('golyglot.lexical-entries').controller('LexicalEntriesShowCtrl', LexicalEntriesShowCtrl);

function LexicalEntriesShowCtrl($scope, $stateParams, LexicalEntry) {
    $scope.searching = true;
    $scope.lexicalEntry = undefined;

    LexicalEntry.get({id: $stateParams.id}).then(function (results) {
        $scope.lexicalEntry = results;
        $scope.searching = false;
    }, function (error) {
        $scope.searching = false;
    });

    $scope.lexicalEntryFixture = {
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

          },


          // Second sense
          {
            "equivalents": [
              {
                "language": "eng",
                "representations": [
                  {
                    "script": "Latn",
                    "writtenForm": "free of charge"
                  }
                ]
              },
              {
                "language": "eng",
                "representations": [
                  {
                    "script": "Latn",
                    "writtenForm": "gratis"
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

};

