require 'rails_helper'

RSpec.describe PartOfSpeech, :type => :request do

  describe "GET /parts_of_speech" do
    it "returns all parts of speech" do
      FactoryGirl.create(:part_of_speech, name: "noun")
      FactoryGirl.create(:part_of_speech, name: "verb")

      get "/parts_of_speech.json"

      json = JSON.parse(response.body)
      names = json.map { |pof| pof["name"] }

      expect(names).to match_array(["noun", "verb"])
    end
  end
end
