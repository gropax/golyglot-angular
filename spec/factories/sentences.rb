FactoryGirl.define do
  factory :sentence do
    language "eng"
    text_representations { create_list(:representation, 2) }
  end

end
