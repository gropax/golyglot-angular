require 'rails_helper'
require 'auth_token'

RSpec.describe User, :type => :request do

  current_user :bob

  describe "GET /api/users?name=:name" do
    before(:each) do
      FactoryGirl.create(:john)
      get api_users_path, name: 'JohnnyD'
    end

    it "returns the user" do
      expect(json["id"]).to be_kind_of String
      expect(json["email"]).to eq "john@doe.com"
      expect(json["name"]).to eq "JohnnyD"
    end
  end
end
