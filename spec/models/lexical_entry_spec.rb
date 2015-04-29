require 'rails_helper'

RSpec.describe LexicalEntry, :type => :model do

  let(:lexical_entry) { FactoryGirl.create(:cmn_lexical_entry) }


  it "has a valid factory" do
    expect(lexical_entry).to be_valid
  end

  describe "#lexicon" do
    it "should not be blank" do
      lexical_entry.lexicon = nil
      expect(lexical_entry).not_to be_valid
    end
  end

  describe "#language" do
    it "should not be blank" do
      lexical_entry.language = nil
      expect(lexical_entry).to be_valid
    end

    it "should be a valid language code" do
      lexical_entry.language = "xxx"
      expect(lexical_entry).not_to be_valid
    end
  end

  describe "#lemma" do
    it "should not be blank" do
      lexical_entry.lemma = nil
      expect(lexical_entry).not_to be_valid
      expect(lexical_entry.errors[:lemma]).to eq ["can't be blank"]
    end

    it "should be valid" do
      lexical_entry.lemma.representations = nil
      expect(lexical_entry).not_to be_valid
      expect(lexical_entry.errors[:lemma]).to eq ["is invalid"]
    end
  end

  describe "timestamps" do
    it "respond to #created_at" do
      expect(lexical_entry.created_at).to be_kind_of ActiveSupport::TimeWithZone
    end

    it "respond to #updated_at" do
      expect(lexical_entry.updated_at).to be_kind_of ActiveSupport::TimeWithZone
    end
  end

  describe "nested attributes" do

    context "when creating entry" do
      let(:lexicon) { FactoryGirl.create(:lexicon) }
      let(:data) {
        {
          language: 'cmn',
          lexicon_id: lexicon.id,
          lemma: {
            representations: [
              { script: 'Latn',
                orthography_name: 'pinyin',
                written_form: "ni3hao3" }]}}
      }

      before :each do
        LexicalEntry.create(data)
      end

      it "should allow nested parameters" do
        pinyin = LexicalEntry.first.lemma.representations.first.written_form
        expect(pinyin).to eq "ni3hao3"
      end
    end

    context "when updating entry" do
      let(:representations) { lexical_entry.lemma.representations }

      let(:simplified) { representations.detect { |r| r.script == "Hans" } }
      let(:traditional) { representations.detect { |r| r.script == "Hant" } }
      let(:pinyin) { representations.detect { |r| r.script == "Latn" } }

      let(:lemma_attributes) {
        {
          representations_attributes: [
            { # Update element
              id: pinyin.id,
              written_form: "ni3hao3ma"
            },
            { # Destroy element
              id: traditional.id,
              _destroy: true
            },
            { # Create element
              script: 'Hant',
              orthography_name: 'traditional',
              written_form: 'ZZ'
            },
          ]
        }
      }

      before :each do
        lexical_entry.update_attributes lemma_attributes: lemma_attributes
        # @fixme Need to manually persist the new representation
        lexical_entry.lemma.representations.last.save
        @reprs = LexicalEntry.first.lemma.representations
      end

      it "should leave one element untouched" do
        s = @reprs.find(simplified.id)
        expect(s.written_form).to eq "XX"
      end

      it "should update one element" do
        p = @reprs.find(pinyin.id)
        expect(p.written_form).to eq "ni3hao3ma"
      end

      it "should destroy one element" do
        t = @reprs.where(id: traditional.id).first
        expect(t).to be nil
      end

      it "should create one element" do
        t = @reprs.find_by({script: 'Hant'})
        expect(t.written_form).to eq "ZZ"
      end
    end
  end


  it "embeds many senses" do
    senses = FactoryGirl.create_list(:sense, 4, lexical_entry: lexical_entry)
    expect(lexical_entry.senses).to match_array(senses)
  end

end
