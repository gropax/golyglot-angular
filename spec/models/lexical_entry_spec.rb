require 'rails_helper'

RSpec.describe LexicalEntry, :type => :model do

  let(:lexical_entry) { FactoryGirl.create(:lexical_entry) }
  let(:pof) { FactoryGirl.create(:part_of_speech) }
  let(:lex_typ) { FactoryGirl.create(:lexical_entry_type) }


  it "has a valid factory" do
    expect(lexical_entry).to be_valid
  end

  describe "#lexicon" do
    it "must belong to a lexicon" do
      lexical_entry.lexicon = nil
      expect(lexical_entry).not_to be_valid
    end
  end

  it "may have a part of speech" do
    expect { lexical_entry.part_of_speech = pof }.not_to raise_error
  end

  it "has a type" do
    expect { lexical_entry.type = lex_typ }.not_to raise_error
  end

  it "embeds many senses" do
    senses = FactoryGirl.create_list(:sense, 4, lexical_entry: lexical_entry)
    expect(lexical_entry.senses).to match_array(senses)
  end


  describe "validation" do

    it "has a valid factory" do
      expect(lexical_entry).to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        lexical_entry.language = nil
        expect(lexical_entry).to be_valid
      end

      it "it is invalid with an invalid code" do
        lexical_entry.language = "xxx"
        expect(lexical_entry).not_to be_valid
      end
    end

    context "#lemma" do
      it "it invalid without a lemma" do
        lexical_entry.lemma = nil
        expect(lexical_entry).not_to be_valid
      end
    end
  end


end
