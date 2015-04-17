require 'rails_helper'
require 'auth_token'

RSpec.describe Api::BaseController, :type => :controller do

  controller do
    def index
      render text: "success"
    end
  end

  describe "#authenticate before_action filter" do
    before(:each) do
      @bob = FactoryGirl.create(:bob)
    end

    context "valid auth token" do
      before(:each) do
        token = AuthToken.issue_token({user_id: @bob.id.to_s})
        request.headers['Authorization'] = token
        get :index
      end

      it "execute action" do
        expect(response.status).to eq(200)
      end
    end

    context "invalid auth token" do
      before(:each) do
        token = "Fake wrong token"
        request.headers['Authorization'] = token
        get :index
      end

      it "returns unauthorized error" do
        expect(response.status).to eq(401)
      end
    end
  end

end
