FactoryGirl.define do

  factory :sentence_axis, :class => 'SentenceAxis' do
    sentences { create_list(:sentence, 2) }
  end

end
