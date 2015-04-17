require 'rails_helper'

RSpec.describe PartOfSpeech, :type => :request do

  describe "GET /api/lexical_entries" do
    before(:each) do
      FactoryGirl.create_list(:lexical_entry, 3)

      get "api/lexical_entries.json"

      @lexical_entries = JSON.parse(response.body)
    end

    it "returns all lexical entries" do
      expect(@lexical_entries.size).to eq(3)
    end

    it "returns lexical entries with lemma" do
      expect(@lexical_entries.first["lemma"]).not_to be_nil
    end

    it "returns lexical entries without senses" do
      expect(@lexical_entries.first["senses"]).to be_nil
    end
  end

  describe "GET /api/lexical_entries/:id" do
    before(:each) do
      lex = FactoryGirl.create(:lexical_entry)
      id = lex.id

      get "api/lexical_entries/#{id}.json"

      @lexical_entry = JSON.parse(response.body)
    end

    it "returns lexical entry with lemma" do
      expect(@lexical_entry["lemma"]).not_to be_nil
    end

    it "returns lexical entry with senses" do
      expect(@lexical_entry["senses"]).not_to be_nil
    end
  end
end
