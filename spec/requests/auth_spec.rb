require 'rails_helper'
require 'jwt'

RSpec.describe "AuthRequests", :type => :request do
  describe "POST /auth/sign_up" do
    let(:valid_data) {
      {
        email: "john@doe.com",
        password: "gojohnnygo",
        password_confirmation: "gojohnnygo",
        accept_terms: true,
      }
    }

    context "valid request params" do
      before(:each) do
        post "/auth/sign_up.json", {auth: valid_data}
        @json = JSON.parse(response.body)
      end

      it "returns a success status code" do
        expect(response).to have_http_status(200)
      end

      it "returns apropriate user data" do
        user = @json["user"]
        expect(user["id"]).to be_kind_of String
        expect(user["email"]).to eq("john@doe.com")
      end

      it "does not returns secret user data" do
        user = @json["user"]
        expect(user).not_to have_key("password_hash")
        expect(user).not_to have_key("created_at")
        expect(user).not_to have_key("updated_at")
      end

      it "returns auth token" do
        token = @json["token"]
        expect(token).to be_kind_of String
      end
    end

    context "invalid request parameters" do
      before(:each) do
        invalid_data = valid_data
        invalid_data['accept_terms'] = false
        post "/auth/sign_up.json", {auth: invalid_data} # @fixme
        @json = JSON.parse(response.body)
      end

      it "returns errors" do
        expect(@json['errors']).to have_key("accept_terms")
      end

      it "doesn't return user nor token" do
        expect(@json).not_to have_key("user")
        expect(@json).not_to have_key("token")
      end
    end
  end

  describe "POST /auth/sign_in" do
    before(:each) do
      @john = FactoryGirl.create(:john)
      @valid_data = {
        email: "john@doe.com",
        password: "gojohnnygo",
      }
    end

    context "valid request params" do
      before(:each) do
        post "/auth/sign_in.json", {auth: @valid_data} # @fixme
        @json = JSON.parse(response.body)
      end

      it "returns a success status code" do
        expect(response).to have_http_status(:success)
      end

      it "returns user data" do
        user = @json["user"]
        expect(user["id"]).to be_kind_of String
        expect(user["email"]).to eq("john@doe.com")
      end

      it "returns auth token" do
        token = @json["token"]
        expect(token).to be_kind_of String
      end
    end

    context "invalid request parameters" do
      before(:each) do
        invalid_data = @valid_data
        invalid_data['password'] = "wrongpwd"

        post "/auth/sign_in.json", {auth: invalid_data} # @fixme
        @json = JSON.parse(response.body)
      end

      it "returns unauthorized status code" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns error message" do
        expect(@json['error']).to eq('Invalid email or password.')
      end

      it "doesn't return user nor token" do
        expect(@json).not_to have_key("user")
        expect(@json).not_to have_key("token")
      end
    end
  end

  describe "GET /auth/token_status" do
    before(:each) do
      valid = JWT.encode({}, Rails.application.secrets.secret_key_base)
      @invalid = JWT.encode({}, "fake key 123456789")
      @auth = {token: valid}
    end

    it "returns true if token is valid" do
      get "auth/token_status.json", {auth: @auth}
      expect(response).to have_http_status(:success)
    end

    it "returns false if token is invalid" do
      @auth[:token] = @invalid
      get "auth/token_status.json", {auth: @auth}
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
