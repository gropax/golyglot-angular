class Form
  include Mongoid::Document

  embeds_many :representations
  accepts_nested_attributes_for :representations, allow_destroy: true

  validates_presence_of :representations

  def to_builder
    Jbuilder.new do |form|
      form.id id.to_s
      form.representations representations do |repr|
        # @fixme Weird
        form.merge!(repr.to_builder.attributes!)
      end
    end
  end

end
