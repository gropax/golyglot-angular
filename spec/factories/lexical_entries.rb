FactoryGirl.define do

  factory :lexical_entry do
    language "fra"
    lexicon { create(:lexicon) }
    lemma { create(:form) } # Should be lemma, but pb with association validation
    part_of_speech { create(:part_of_speech) }
    type { create(:lexical_entry_type) }
  end

end
