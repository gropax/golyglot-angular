require 'rails_helper'

RSpec.describe LexicalEntryType, :type => :model do

  let(:lex_typ) { FactoryGirl.create(:lexical_entry_type) }
  let(:lexs) { FactoryGirl.create_list(:lexical_entry, 5, type: lex_typ) }

  it "has many lexical entries" do
    expect(lex_typ.lexical_entries).to match_array(lexs)
  end


  describe "validation" do

    it "has a valid factory" do
      expect(lex_typ).to be_valid
    end

    it "it is invalid without a name" do
      lex_typ.name = nil
      expect(lex_typ).not_to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        lex_typ.language = nil
        expect(lex_typ).to be_valid
      end

      it "it is invalid with an invalid code" do
        lex_typ.language = "xxx"
        expect(lex_typ).not_to be_valid
      end
    end

  end

end
