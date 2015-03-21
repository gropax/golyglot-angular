class LexicalEntry
  include Mongoid::Document

  field :language, type: String

  embeds_one :lemma
  embeds_many :senses

  belongs_to :part_of_speech
  belongs_to :type, class_name: "LexicalEntryType"

  validates_presence_of :lemma
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true,
                                    message: "must be a valid language code"
end
