require 'rails_helper'

RSpec.describe Sentence, :type => :model do

  let(:sent) { FactoryGirl.create(:sentence) }
  let(:axis) { FactoryGirl.create(:sentence_axis) }


  it "may have a sentence axis" do
    sent.sentence_axis = axis
    expect(sent.sentence_axis).to eq(axis)
  end

  describe "validation" do
    it "has a valid factory" do
      expect(sent).to be_valid
    end

    it "it is invalid without representation" do
      sent.text_representations = []
      expect(sent).not_to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        sent.language = nil
        expect(sent).to be_valid
      end

      it "it is invalid with an invalid code" do
        sent.language = "xxx"
        expect(sent).not_to be_valid
      end
    end

  end

  describe "#translations" do
    context "without sentence axis" do
      it "returns []" do
        expect(sent.translations).to eq []
      end
    end

    context "with sentence axis" do
      it "returns all of sentence axis's sentences except itself" do
        others = FactoryGirl.create_list(:sentence, 3)
        axis.sentences = [sent, *others]

        expect(sent.translations).to match_array(others)
      end
    end
  end

end
