class Definition
  include Mongoid::Document

  field :language, type: String
  embedded_in :sense
  embeds_many :text_representations, class_name: "Representation"

  validates_presence_of :text_representations
  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true
end
