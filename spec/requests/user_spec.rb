require 'rails_helper'
require 'auth_token'

RSpec.describe User, :type => :request do

  before(:each) do
    @john = FactoryGirl.create(:john)
    @bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: @bob.id.to_s})
    @headers = {'Authorization' => token}
  end

  describe "GET /api/user/:id/lexicons" do
    before(:each) do
      FactoryGirl.create_list(:lexicon, 4, user: @bob)
      FactoryGirl.create_list(:lexicon, 3, user: @john)

      get "api/users/#{@bob.id}/lexicons.json", nil, @headers

      @json = JSON.parse(response.body)
    end

    it "returns the user's lexicons" do
      expect(@json.size).to eq 4
    end
  end

  describe "POST /api/users/:id/lexicons" do
    before(:each) do
      lexicon = {
        #user: @bob.id,  # Presently use `user_id` found in auth token
        name: "my lexicon",
        description: "a cool lexicon to store entries",
      }
      post "api/users/#{@bob.id}/lexicons.json", {lexicon: lexicon}, @headers

      @json = JSON.parse(response.body)
    end

    it "should create a lexicon in database" do
      lexicon = Lexicon.find_by({user: @bob})
      expect(lexicon.name).to eq "my lexicon"
    end

    it "should return the lexicon id" do
      expect(@json["id"]).to be_kind_of String
    end
  end
end
