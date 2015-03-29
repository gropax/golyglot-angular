json.(lexical_entry, :_id, :lemma, :language, :type)

if lexical_entry.part_of_speech
  json.part_of_speech do
    json.partial! 'parts_of_speech/part_of_speech',
      part_of_speech: lexical_entry.part_of_speech
  end
end
