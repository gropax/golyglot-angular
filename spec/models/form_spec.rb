require 'rails_helper'

RSpec.describe Form, :type => :model do

  let(:form) { FactoryGirl.create(:form) }


  describe "validation" do

    it "has a valid factory" do
      expect(form).to be_valid
    end

    it "it is invalid without representation" do
      form.representations = []
      expect(form).not_to be_valid
    end

  end

end
