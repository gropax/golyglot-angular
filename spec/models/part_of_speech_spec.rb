require 'rails_helper'

RSpec.describe PartOfSpeech, :type => :model do

  describe "validation" do
    let(:pof) { FactoryGirl.create(:part_of_speech) }

    it "has a valid factory" do
      expect(pof).to be_valid
    end

    it "it is invalid without a name" do
      pof.name = nil
      expect(pof).not_to be_valid
    end

    context "#language" do
      it "it is valid without a code" do
        pof.language = nil
        expect(pof).to be_valid
      end

      it "it is invalid with an invalid code" do
        pof.language = "xxx"
        expect(pof).not_to be_valid
      end
    end

  end

end
