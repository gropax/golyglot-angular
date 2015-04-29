FactoryGirl.define do
  factory :representation do
    script "Latn"
    orthography_name do # Generate random name (to avoid validation error)
      (0...20).map { ('a'..'z').to_a[rand(26)] }.join
    end
    written_form "ni3hao3"
  end

  factory :cmn_simplified, class: Representation do
    script 'Hans'
    orthography_name 'simplified'
    written_form 'XX'
  end

  factory :cmn_traditional, class: Representation do
    script 'Hant'
    orthography_name 'traditional'
    written_form 'YY'
  end

  factory :cmn_pinyin, class: Representation do
    script 'Latn'
    orthography_name 'pinyin'
    written_form 'ni3hao3'
  end

end
