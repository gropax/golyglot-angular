FactoryGirl.define do

  factory :lemma do
    representations { create_list(:representation, 2) }
  end

end
