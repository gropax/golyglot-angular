require 'rails_helper'

RSpec.describe Form, :type => :model do

  describe "::attribute_names" do
    it "should include the `:lemma` key" do
      expect(Form.attribute_names).to include(:representations)
    end
  end

end
