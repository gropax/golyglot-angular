require 'rails_helper'

RSpec.describe SentenceAxis, :type => :model do

  let(:axis) { FactoryGirl.create(:sentence_axis) }

  describe "validation" do

    it "has a valid factory" do
      expect(axis).to be_valid
    end

    it "it is invalid without sentences" do
      axis.sentences = []
      expect(axis).not_to be_valid
    end
  end

end
