FactoryGirl.define do
  factory :form do
    representations { build_list(:representation, 2) }
  end

end
