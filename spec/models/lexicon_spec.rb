require 'rails_helper'

RSpec.describe Lexicon, :type => :model do

  let(:bob) { FactoryGirl.create(:bob) }
  let(:john) { FactoryGirl.create(:john) }

  let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }

  it "has a valid factory" do
    expect(lexicon).to be_valid
  end

  describe "#user" do
    it "should not be blank" do
      lexicon.user = nil
      expect(lexicon).not_to be_valid
      expect(lexicon.errors.messages[:user]).to include("can't be blank")
    end
  end

  describe "#name" do
    before :each do
      FactoryGirl.create(:lexicon, user: bob, name: "my lexicon")
    end

    it "should not be blank" do
      lexicon.name = nil
      expect(lexicon).not_to be_valid
      expect(lexicon.errors.messages[:name]).to include("can't be blank")
    end

    it "should be unique among the user's lexicons" do
      dup = FactoryGirl.build(:lexicon, user: bob, name: "my lexicon")
      expect(dup).not_to be_valid
      expect(dup.errors.messages[:name]).to include("is already taken")
    end

    it "can be shared by lexicons of different users" do
      dup = FactoryGirl.build(:lexicon, user: john, name: "my lexicon")
      expect(dup).to be_valid
    end
  end

  describe "#description" do
    it "may have a description" do
      lexicon.description = "bougle"
      expect(lexicon.description).to eq "bougle"
    end
  end

  describe "#lexical_entries" do
    it "has many lexical entries" do
      entries = FactoryGirl.create_list(:lexical_entry, 3, lexicon: lexicon)
      expect(lexicon.lexical_entries).to match_array(entries)
    end
  end

  describe "#sentences" do
    it "has many sentences"
  end

end
