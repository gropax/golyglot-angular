class Form
  include Mongoid::Document

  embeds_many :representations
  accepts_nested_attributes_for :representations, allow_destroy: true

  validates_presence_of :representations
end
