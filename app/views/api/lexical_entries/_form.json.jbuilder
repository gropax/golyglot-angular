json.id form.id.to_s

json.representations do
  json.array! form.representations, partial: "api/lexical_entries/representation", as: :representation
end
