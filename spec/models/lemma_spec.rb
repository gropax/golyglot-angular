require 'rails_helper'

RSpec.describe Lemma, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:lemma) { FactoryGirl.create(:lemma, lexical_entry: lex) }

  it "is embeded in a lexical entry" do
    expect(lex.lemma).to eq(lemma)
  end

  it "has a valid factory" do
    expect(lemma).to be_valid
  end

end
