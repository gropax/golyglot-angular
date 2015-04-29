require 'rails_helper'

RSpec.describe Equivalent, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:sense) { FactoryGirl.create(:sense, lexical_entry: lex) }
  let(:eqv) { FactoryGirl.create(:equivalent, sense: sense) }

  it "is embeded in a sense" do
    expect(sense.equivalents).to include(eqv)
  end


  describe "validation" do

    it "has a valid factory" do
      expect(eqv).to be_valid
    end

    it "it is invalid without representation" do
      eqv.text_representations = []
      expect(eqv).not_to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        eqv.language = nil
        expect(eqv).to be_valid
      end

      it "it is invalid with an invalid code" do
        eqv.language = "xxx"
        expect(eqv).not_to be_valid
      end
    end

  end

end
