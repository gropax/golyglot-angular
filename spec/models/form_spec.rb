require 'rails_helper'

RSpec.describe Form, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:form) { FactoryGirl.create(:form, lexical_entry: lex) }

  it "is embeded in a lexical entry" do
    expect(lex.senses).to include(sense)
  end


  describe "validation" do

    it "has a valid factory" do
      expect(form).to be_valid
    end

    it "it is invalid without representation" do
      form.form_representations = []
      expect(form).not_to be_valid
    end

  end

end
