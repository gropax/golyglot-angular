FactoryGirl.define do

  factory :lexical_entry do
    language 'eng'
    lexicon { create(:lexicon) }
    lemma { build(:lemma) }
  end

  factory :cmn_lexical_entry, class: LexicalEntry do
    language 'cmn'
    lexicon { create(:lexicon) }
    lemma { build(:cmn_lemma) }
  end

end
