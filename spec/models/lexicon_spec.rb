require 'rails_helper'

RSpec.describe Lexicon, :type => :model do

  let(:lexicon) { FactoryGirl.create(:lexicon) }

  it "has a valid factory" do
    expect(lexicon).to be_valid
  end

  describe "#user" do
    it "must have an user" do
      lexicon.user = nil
      expect(lexicon).not_to be_valid
    end
  end

  describe "#name" do
    it "must have a name" do
      lexicon.name = nil
      expect(lexicon).not_to be_valid
    end

    it "must be unique among the user's lexicons" do
      bob = FactoryGirl.create(:bob)
      FactoryGirl.create(:lexicon, user: bob, name: "my lexicon")
      duplicate = FactoryGirl.build(:lexicon, user: bob, name: "my lexicon")
      expect(duplicate).not_to be_valid
    end
  end

  describe "#description" do
    it "may have a description" do
      lexicon.description = "bougle"
      expect(lexicon.description).to eq "bougle"
    end
  end

  describe "#lexical_entries" do
    it "has many lexical entries"
  end

  describe "#sentences" do
    it "has many sentences"
  end

end
