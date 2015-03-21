FactoryGirl.define do

  factory :lemma do
    form_representations { create_list(:representation, 2) }
  end

end
