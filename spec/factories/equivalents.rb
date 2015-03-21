FactoryGirl.define do
  factory :equivalent do
    language "eng"
    text_representations { create_list(:representation, 2) }
  end

end
