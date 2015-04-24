FactoryGirl.define do
  factory :form do
    representations { create_list(:representation, 2) }
  end

end
