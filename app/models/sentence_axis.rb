class SentenceAxis
  include Mongoid::Document

  has_many :sentences
  validates_presence_of :sentences
end
