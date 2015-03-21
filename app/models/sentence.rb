class Sentence
  include Mongoid::Document

  field :language, type: String

  embeds_many :text_representations, class_name: "Representation"
  belongs_to :sentence_axis

  validates_presence_of :text_representations
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true
end
