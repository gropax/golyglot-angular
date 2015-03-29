json.(sense, :_id, :equivalents, :definitions)

json.sentences sense.sentences do |sentence|
  json.partial! "lexical_entries/sentence", sentence: sentence

  # Include all translations
  #
  json.translations sentence.translations do |translation|
    json.partial! "lexical_entries/sentence", sentence: translation
  end
end
