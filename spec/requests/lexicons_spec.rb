require 'rails_helper'
require 'auth_token'

RSpec.describe PartOfSpeech, :type => :request do

  before(:each) do
    @bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: @bob.id.to_s})
    @headers = {'Authorization' => token}
  end

  describe "POST /api/lexicons" do
    before(:each) do
      lexicon = {
        #owner: @bob.id,  # Presently use `user_id` found in auth token
        name: "my lexicon",
        description: "a cool lexicon to store entries",
      }
      post "api/lexicons.json", {lexicon: lexicon}, @headers

      @json = JSON.parse(response.body)
    end

    it "should create a lexicon in database" do
      lexicon = Lexicon.find_by({owner: @bob})
      expect(lexicon.name).to eq "my lexicon"
    end

    it "should return the lexicon id" do
      expect(@json["id"]).to be_kind_of String
    end
  end
end
