require 'rails_helper'

RSpec.describe Sense, :type => :model do

  let(:lex) { FactoryGirl.create(:lexical_entry) }
  let(:sense) { FactoryGirl.create(:sense, lexical_entry: lex) }


  it "is embeded in a lexical entry" do
    expect(lex.senses).to include(sense)
  end

  it "embeds many definitions" do
    defs = FactoryGirl.create_list(:definition, 4, sense: sense)
    expect(sense.definitions).to match_array(defs)
  end

  it "embeds many equivalents" do
    eqvs = FactoryGirl.create_list(:equivalent, 4, sense: sense)
    expect(sense.equivalents).to match_array(eqvs)
  end

  it "references many contexts" do
    sents = FactoryGirl.create_list(:sentence, 4)
    sense.sentences = sents
    expect(sense.sentences).to match_array(sents)
  end

end
