json.partial! "lexical_entries/lexical_entry", lexical_entry: @lexical_entry

json.senses do
  json.array! @lexical_entry.senses, partial: "lexical_entries/sense", as: :sense
end
