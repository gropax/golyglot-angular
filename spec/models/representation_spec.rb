require 'rails_helper'

RSpec.describe Representation, :type => :model do

  let(:repr) { FactoryGirl.create(:representation) }


  describe "validation" do

    it "has a valid factory" do
      expect(repr).to be_valid
    end

    it "it is invalid without a written form" do
      repr.written_form = nil
      expect(repr).not_to be_valid
    end

    context "#script" do
      it "it is invalid without a script" do
        repr.script = nil
        expect(repr).not_to be_valid
      end

      it "it is invalid with an invalid code" do
        repr.script = "xxxx"
        expect(repr).not_to be_valid
      end
    end

  end

end
