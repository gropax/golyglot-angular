require 'rails_helper'

RSpec.describe "AuthRequests", :type => :request do
  describe "POST /auth/sign_up" do
    let(:valid_data) {
      {
        name: "JohnnyD",
        email: "john@doe.com",
        password: "gojohnnygo",
        password_confirmation: "gojohnnygo",
        accept_terms: true,
      }
    }

    context "valid request params" do
      before(:each) do
        post auth_sign_up_path, {auth: valid_data}, {"Accept" => "application/json"}
      end

      it "returns a success status code" do
        expect(response).to have_http_status(200)
      end

      it "returns apropriate user data" do
        user = json["user"]
        expect(user["id"]).to be_kind_of String
        expect(user["email"]).to eq("john@doe.com")
        expect(user["name"]).to eq("JohnnyD")
      end

      it "does not returns secret user data" do
        user = json["user"]
        expect(user).not_to have_key("password_hash")
        expect(user).not_to have_key("created_at")
        expect(user).not_to have_key("updated_at")
      end

      it "returns auth token" do
        token = json["token"]
        expect(token).to be_kind_of String
      end
    end

    context "invalid request parameters" do
      before(:each) do
        invalid_data = valid_data
        invalid_data['accept_terms'] = false
        post "/auth/sign_up", {auth: invalid_data} # @fixme
      end

      it "returns errors" do
        expect(json['errors']).to have_key("accept_terms")
      end

      it "doesn't return user nor token" do
        expect(json).not_to have_key("user")
        expect(json).not_to have_key("token")
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
        post "/auth/sign_in", {auth: @valid_data} # @fixme
      end

      it "returns a success status code" do
        expect(response).to have_http_status(:success)
      end

      it "returns user data" do
        user = json["user"]
        expect(user["id"]).to be_kind_of String
        expect(user["email"]).to eq("john@doe.com")
        expect(user["name"]).to eq("JohnnyD")
      end

      it "returns auth token" do
        expect(json["token"]).to be_kind_of String
      end
    end

    context "invalid password" do
      before(:each) do
        invalid_data = @valid_data
        invalid_data['password'] = "wrongpwd"

        post "/auth/sign_in", {auth: invalid_data} # @fixme
      end

      it "returns unauthorized status code" do
        expect(response).to have_http_status(:unauthorized)
      end

      it "returns error message" do
        expect(json['error']).to eq('Invalid email or password.')
      end

      it "doesn't return user nor token" do
        expect(json).not_to have_key("user")
        expect(json).not_to have_key("token")
      end
    end

    context "invalid user email" do
      before(:each) do
        invalid_data = @valid_data
        invalid_data['email'] = "wrong@email.com"

        post "/auth/sign_in", auth: invalid_data
      end

      it "returns unauthorized status code (not 404 not found)" do
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end

  describe "GET /auth/token_status" do
    it "returns true if token is valid" do
      get "auth/token_status", auth: {token: valid_token}
      expect(response).to have_http_status(:success)
    end

    it "returns false if token is invalid" do
      get "auth/token_status", auth: {token: invalid_token}
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
