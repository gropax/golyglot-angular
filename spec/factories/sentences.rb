FactoryGirl.define do
  factory :sentence do
    language "eng"
    text_representations { build_list(:representation, 2) }
  end

end
