class Form
  include Mongoid::Document

  # For now, totally dynamic fields

  embeds_many :form_representations, class_name: "Representation"

  validates_presence_of :form_representations
end
