class PartOfSpeech
  include Mongoid::Document

  field :name, type: String
  field :language, type: String

  has_many :lexical_entries

  #belongs_to :parent, class_name: "PartOfSpeech", inverse_of: :children
  #has_many :children, class_name: "PartOfSpeech", inverse_of: :parent

  validates_presence_of :name
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true
end
