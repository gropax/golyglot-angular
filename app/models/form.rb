class Form
  include Mongoid::Document

  embeds_many :representations

  validates_presence_of :representations
end
