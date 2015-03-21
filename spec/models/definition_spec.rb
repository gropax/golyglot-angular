require 'rails_helper'

RSpec.describe Definition, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:sense) { FactoryGirl.create(:sense, lexical_entry: lex) }
  let(:defn) { FactoryGirl.create(:definition, sense: sense) }

  it "is embeded in a sense" do
    expect(sense.definitions).to include(defn)
  end


  describe "validation" do

    it "has a valid factory" do
      expect(defn).to be_valid
    end

    it "it is invalid without representation" do
      defn.text_representations = []
      expect(defn).not_to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        defn.language = nil
        expect(defn).to be_valid
      end

      it "it is invalid with an invalid code" do
        defn.language = "xxx"
        expect(defn).not_to be_valid
      end
    end

  end

end
