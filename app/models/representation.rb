class Representation
  include Mongoid::Document

  embedded_in :form

  field :script, type: String
  field :orthography_name, type: String
  field :written_form, type: String

  validates_presence_of :script, :written_form
  validates_inclusion_of :script, in: SCRIPT_CODES
  validates_uniqueness_of :orthography_name

  def to_builder
    Jbuilder.new do |repr|
      repr.id id.to_s
      repr.(self, :script, :orthography_name, :written_form)
    end
  end
end
