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

  def self.attribute_names
    super + [:lemma]
  end

  def to_builder
    Jbuilder.new do |json|
      json.id id.to_s
      json.lexicon_id lexicon.id.to_s

      json.(self, :language, :created_at, :updated_at)

      json.lemma lemma.to_builder
    end
  end

end
