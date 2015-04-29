require 'rails_helper'

RSpec.describe Lemma, :type => :model do

  let(:lexical_entry) { FactoryGirl.create(:cmn_lexical_entry) }
  let(:lemma) { lexical_entry.lemma }

  it "has a valid factory" do
    expect(lemma).to be_valid
  end

  describe "#representations" do
    it "should not be blank" do
      lemma.representations = []
      expect(lemma).not_to be_valid
      expect(lemma.errors[:representations]).to eq ["can't be blank"]
    end

    it "should not contains repr. with same orthography_name" do
      lemma.representations << FactoryGirl.build(:cmn_pinyin)
      expect(lemma).not_to be_valid
      #expect(lemma.errors[:representations]).to eq ["duplicate representation format"]
    end
  end

end
