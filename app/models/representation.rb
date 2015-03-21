class Representation
  include Mongoid::Document

  field :script, type: String
  field :orthography_name, type: String
  field :written_form, type: String

  validates_presence_of :script, :written_form
  validates_inclusion_of :script, in: SCRIPT_CODES
end
