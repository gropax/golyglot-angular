FactoryGirl.define do
  factory :form do
    form_representations { create_list(:representation, 2) }
  end

end
