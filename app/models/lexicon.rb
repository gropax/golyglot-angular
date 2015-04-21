class Lexicon
  include Mongoid::Document

  field :name, type: String
  field :description, type: String

  belongs_to :user

  validates_presence_of :name
  validates_uniqueness_of :name, scope: :user
  validates_presence_of :user
end
