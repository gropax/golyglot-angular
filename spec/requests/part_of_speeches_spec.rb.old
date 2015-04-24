require 'rails_helper'

RSpec.describe PartOfSpeech, :type => :request do

  before(:each) do
    bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: bob.id.to_s})
    @headers = {'Authorization' => token}
  end

  describe "GET /api/parts_of_speech" do
    it "returns all parts of speech" do
      FactoryGirl.create(:part_of_speech, name: "noun")
      FactoryGirl.create(:part_of_speech, name: "verb")

      get "api/parts_of_speech.json", nil, @headers

      json = JSON.parse(response.body)
      names = json.map { |pof| pof["name"] }

      expect(names).to match_array(["noun", "verb"])
    end
  end
end
