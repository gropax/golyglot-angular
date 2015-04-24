require 'rails_helper'
require 'auth_token'

RSpec.describe User, :type => :request do

  before(:each) do
    @john = FactoryGirl.create(:john)
    @bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: @bob.id.to_s})
    @headers = {'Authorization' => token}
  end

  describe "GET /api/users?name=:name" do
    before(:each) do
      get api_users_path, {name: 'JohnnyD'}, @headers
    end

    it "returns the user" do
      expect(json["id"]).to be_kind_of String
      expect(json["email"]).to eq("john@doe.com")
      expect(json["name"]).to eq("JohnnyD")
    end
  end
end
