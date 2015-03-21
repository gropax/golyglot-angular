FactoryGirl.define do
  factory :lexical_entry do
    language "fra"
    lemma { create(:form) }
  end

end
