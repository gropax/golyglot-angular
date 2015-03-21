class Form
  include Mongoid::Document

  embeds_many :form_representations, class_name: "Representation"

  validates_presence_of :form_representations
end
