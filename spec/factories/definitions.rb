FactoryGirl.define do
  factory :definition do
    language "eng"
    text_representations { create_list(:representation, 2) }
  end

end
