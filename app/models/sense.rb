class Sense
  include Mongoid::Document

  embedded_in :lexical_entry
  embeds_many :definitions
end
