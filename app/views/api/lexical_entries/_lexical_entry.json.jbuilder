json.(lexical_entry, :language, :type)
json.id lexical_entry.id.to_s
json.lexicon_id lexical_entry.lexicon.id.to_s

json.lemma do
  json.partial! 'api/lexical_entries/form',
    form: lexical_entry.lemma
end

if lexical_entry.part_of_speech
  json.part_of_speech do
    json.partial! 'api/parts_of_speech/part_of_speech',
      part_of_speech: lexical_entry.part_of_speech
  end
end
