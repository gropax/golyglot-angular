class Sense
  include Mongoid::Document

  embedded_in :lexical_entry
  embeds_many :definitions
  embeds_many :equivalents
  has_and_belongs_to_many :sentences
end
