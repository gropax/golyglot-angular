class LexicalEntryType
  include Mongoid::Document

  field :name, type: String
  field :language, type: String

  has_many :lexical_entries

  validates_presence_of :name
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true
end
