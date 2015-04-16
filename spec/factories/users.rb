FactoryGirl.define do
  factory :bob, class: User do
    email "bob@jackson.com"
    accept_terms true
    password "bobbybou"
    password_confirmation { password }
  end

  factory :john, class: User do
    email "john@doe.com"
    accept_terms true
    password "gojohnnygo"
    password_confirmation { password }
  end

end
