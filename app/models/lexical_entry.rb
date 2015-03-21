class LexicalEntry
  include Mongoid::Document

  LANGUAGE_CODES = ["cmn", "eng", "fra"]

  field :language, type: String

  validates_inclusion_of :language, in: LANGUAGE_CODES,
                                    allow_blank: true,
                                    message: "must be a valid language code"
end
