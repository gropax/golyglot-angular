# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


pof = PartOfSpeech.create({name: "adverb", language: "cmn"})
type = LexicalEntryType.create({name: "word", language: "cmn"})



lex = LexicalEntry.new({language: "cmn", part_of_speech: pof, type: type})

# Lemma
# +++++

lex.lemma = lemma = Form.new

lemma.form_representations = [
  Representation.new({
    script: "Hans",
    orthography_name: "simplified",
    written_form: "白",
  }),
  Representation.new({
    script: "Hant",
    orthography_name: "traditional",
    written_form: "白",
  }),
  Representation.new({
    script: "Latn",
    orthography_name: "pinyin",
    written_form: "bai2",
  }),
]

# First sense
# +++++++++++

sense1 = Sense.new

# --> Equivalents
#
sense1.equivalents = [
  Equivalent.new({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "for nothing",
      })
    ]
  }),
  Equivalent.new({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "in vain",
      })
    ]
  }),
  Equivalent.new({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "en vain",
      })
    ]
  }),
  Equivalent.new({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "pour rien",
      })
    ]
  }),
]

# --> Definitions
#
sense1.definitions = [
  Definition.new({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Not yielding the desired outcome",
      })
    ]
  }),
  Definition.new({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Sans obtenir le résultat escompté",
      })
    ]
  }),
]


# --> Sentences
#
sentence_axis1 = SentenceAxis.new
sentence_axis1.sentences = [
  Sentence.create({
    language: "cmn",
    text_representations: [
      Representation.new({
        script: "Hans",
        orthography_name: "simplified",
        written_form: "我的活儿全白干了",
      }),
      Representation.new({
        script: "Hant",
        orthography_name: "traditional",
        written_form: "我的活兒全白幹了",
      }),
      Representation.new({
        script: "Latn",
        orthography_name: "pinyin",
        written_form: "wo3 de huor2 quan2 bai2 gan4 le.",
      }),
    ]
  }),
  Sentence.create({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "All my work was wasted.",
      })
    ]
  }),
  Sentence.create({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Tout mon travail a été gâché.",
      })
    ]
  }),
]

sentence_axis1.save


sentence_axis2 = SentenceAxis.new
sentence_axis2.sentences = [
  Sentence.create({
    language: "cmn",
    text_representations: [
      Representation.new({
        script: "Hans",
        orthography_name: "simplified",
        written_form: "烈士们的鲜血没有白流",
      }),
      Representation.new({
        script: "Hant",
        orthography_name: "traditional",
        written_form: "烈士們的鮮血沒有白流",
      }),
      Representation.new({
        script: "Latn",
        orthography_name: "pinyin",
        written_form: "lie4shi4 men de xian1xue4 mei2you3 bai2 liu2.",
      }),
    ]
  }),
  Sentence.create({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "The martyrs did not shed their blood in vain.",
      })
    ]
  }),
  Sentence.create({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Le sang des martyrs n'a pas été versé en vain.",
      })
    ]
  }),
]

sentence_axis2.save


sense1.sentences = [
  sentence_axis1.sentences.first,
  sentence_axis2.sentences.first,
]




sense2 = Sense.new

sense2.equivalents = [
  Equivalent.new({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "free of charge",
      })
    ]
  }),
  Equivalent.new({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "gratuitement",
      })
    ]
  }),
]

# --> Definitions
#
sense2.definitions = [
  Definition.new({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Without any payment being required",
      })
    ]
  }),
  Definition.new({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "De manière gratuite, sans rétribution",
      })
    ]
  }),
]

sentence_axis3 = SentenceAxis.new
sentence_axis3.sentences = [
  Sentence.create({
    language: "cmn",
    text_representations: [
      Representation.new({
        script: "Hans",
        orthography_name: "simplified",
        written_form: "白给我也不要",
      }),
      Representation.new({
        script: "Hant",
        orthography_name: "traditional",
        written_form: "白給我也不要",
      }),
      Representation.new({
        script: "Latn",
        orthography_name: "pinyin",
        written_form: "bai2 gei2 wo3 ye3 bu4 yao4.",
      }),
    ]
  }),
  Sentence.create({
    language: "eng",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "I wouldn't take it even as a gift.",
      })
    ]
  }),
  Sentence.create({
    language: "fra",
    text_representations: [
      Representation.new({
        script: "Latn",
        written_form: "Je n'en voudrais pas même comme cadeau.",
      })
    ]
  }),
]

sentence_axis3.save


sense2.sentences = [
  sentence_axis3.sentences.first,
]




lex.senses = [sense1, sense2]

lex.save
