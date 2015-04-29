class LexicalEntry
  include Mongoid::Document
  include Mongoid::Timestamps

  field :language, type: String

  embeds_one :lemma
  accepts_nested_attributes_for :lemma

  embeds_many :senses

  belongs_to :lexicon
  belongs_to :part_of_speech
  belongs_to :type, class_name: "LexicalEntryType"

  validates_presence_of :lexicon
  validates_presence_of :lemma
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true,
                                    message: "is invalid language code"
end
