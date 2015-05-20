module ModelHelpers
  def cmn_lexical_entry(lexicon, simplified, traditional, pinyin)
    LexicalEntry.create({
      language: 'cmn',
      lexicon: lexicon,
      lemma: {
        representations: [
          {
            script: 'Hans',
            orthography_name: 'simplified',
            written_form: simplified
          },
          {
            script: 'Hant',
            orthography_name: 'traditional',
            written_form: traditional
          },
          {
            script: 'Latn',
            orthography_name: 'pinyin',
            written_form: pinyin
          }
        ]
      }
    })
  end

  def eng_lexical_entry(lexicon, written_form)
    LexicalEntry.create({
      language: 'eng',
      lexicon: lexicon,
      lemma: {
        representations: [
          {
            script: 'Latn',
            orthography_name: 'english',
            written_form: written_form
          }
        ]
      }
    })
  end
end
