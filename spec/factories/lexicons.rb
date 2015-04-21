FactoryGirl.define do

  factory :lexicon do
    name do # Generate random name
      (0...20).map { ('a'..'z').to_a[rand(26)] }.join
    end
    owner { FactoryGirl.create(:bob) }
  end

end
