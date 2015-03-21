require 'rails_helper'

RSpec.describe LexicalEntry, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:pof) { FactoryGirl.create(:part_of_speech) }
  let(:lex_typ) { FactoryGirl.create(:lexical_entry_type) }

  it "may have a part of speech" do
    expect { lex.part_of_speech = pof }.not_to raise_error
  end

  it "has a type" do
    expect { lex.type = lex_typ }.not_to raise_error
  end


  describe "validation" do

    it "has a valid factory" do
      expect(lex).to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        lex.language = nil
        expect(lex).to be_valid
      end

      it "it is invalid with an invalid code" do
        lex.language = "xxx"
        expect(lex).not_to be_valid
      end
    end

    context "#lemma" do
      it "it invalid without a lemma" do
        lex.lemma = nil
        expect(lex).not_to be_valid
      end
    end
  end


end
