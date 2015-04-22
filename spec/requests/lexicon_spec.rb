require 'rails_helper'
require 'auth_token'

RSpec.describe Lexicon, :type => :request do

  before(:each) do
    @john = FactoryGirl.create(:john)
    @bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: @bob.id.to_s})
    @headers = {'Authorization' => token}
  end

  describe "GET /api/users/:id/lexicons" do
    before(:each) do
      FactoryGirl.create_list(:lexicon, 4, user: @bob)
      FactoryGirl.create_list(:lexicon, 3, user: @john)
    end

    context "without query params" do
      before(:each) do
        get "api/users/#{@bob.id}/lexicons.json", nil, @headers
        @json = JSON.parse(response.body)
      end

      it "returns the user's lexicons" do
        expect(@json.size).to eq 4
      end
    end

    context "with 'name' query param" do
      before(:each) do
        FactoryGirl.create(:lexicon, name: "MyLexicon", user: @bob)

        get "api/users/#{@bob.id}/lexicons.json", {name: "MyLexicon"}, @headers
        @json = JSON.parse(response.body)
      end

      it "returns single lexicon found by name" do
        expect(@json['name']).to eq("MyLexicon")
      end
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

  describe "DELETE /api/users/:user_id/lexicons/:id" do
    context "current user is the owner" do
      before(:each) do
        lex = FactoryGirl.create(:lexicon, name: "MyLexicon", user: @bob)
        delete "api/users/#{@bob.id}/lexicons/#{lex.id}.json", nil, @headers
      end

      it "should return success status code" do
        expect(response).to have_http_status(:success)
      end

      it "should delete the lexicon" do
        expect(Lexicon.count).to eq 0
      end
    end

    context "current user is NOT the owner" do
      before(:each) do
        lex = FactoryGirl.create(:lexicon, name: "MyLexicon", user: @john)
        delete "api/users/#{@john.id}/lexicons/#{lex.id}.json", nil, @headers
      end

      it "should return forbidden status code" do
        expect(response).to have_http_status(:forbidden)
      end

      it "should NOT delete the lexicon" do
        expect(Lexicon.count).to eq 1
      end
    end
  end

end
