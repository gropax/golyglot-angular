class Lemma < Form
  embedded_in :lexical_entry, inverse_of: :lemma

  def to_builder
    Jbuilder.new do |lemma|
      lemma.merge!(super.attributes!)
      lemma.lexical_entry_id lexical_entry.id.to_s
    end
  end
end
