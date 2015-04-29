FactoryGirl.define do

  factory :lemma do
    representations { build_list(:representation, 2) }
  end

  factory :cmn_lemma, class: Lemma do
    representations {
      [build(:cmn_simplified), build(:cmn_traditional), build(:cmn_pinyin)]
    }
  end

end
