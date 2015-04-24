require 'rails_helper'
require 'auth_token'

RSpec.describe Lexicon, :type => :request do

  current_user :bob
  let(:john) { FactoryGirl.create(:john) }

  describe "GET /api/users/:id/lexicons" do
    before(:each) do
      FactoryGirl.create_list(:lexicon, 4, user: bob)
      FactoryGirl.create_list(:lexicon, 3, user: john)
    end

    context "without query params" do
      before(:each) do
        get api_user_lexicons_path(bob)
      end

      it "returns the user's lexicons" do
        expect(json.size).to eq 4
      end
    end

    context "with 'name' query param" do
      before(:each) do
        FactoryGirl.create(:lexicon, name: "MyLexicon", user: bob)
        get api_user_lexicons_path(bob), name: "MyLexicon"
      end

      it "returns single lexicon found by name" do
        expect(json['name']).to eq "MyLexicon"
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
      post api_user_lexicons_path(bob), lexicon: lexicon
    end

    it "should create a lexicon in database" do
      lexicon = Lexicon.find_by user: bob
      expect(lexicon.name).to eq "my lexicon"
    end

    it "should return the lexicon id" do
      expect(json["id"]).to be_kind_of String
    end
  end

  describe "PUT /api/users/:user_id/lexicons/:id" do
    let(:params) { {name: "Renamed", description: "Nice"} }

    context "current user is the owner" do
      let(:lexicon) { FactoryGirl.create(:lexicon, name: "MyLexicon", description: "Cool", user: bob) }

      before(:each) do
        put api_user_lexicon_path(bob, lexicon), lexicon: params
      end

      it "should return success status code" do
        expect(response).to have_http_status :success
      end

      it "should update the lexicon attributes" do
        lex = Lexicon.find_by id: lexicon.id
        expect(lex.name).to eq "Renamed"
        expect(lex.description).to eq "Nice"
      end
    end

    context "current user is NOT the owner" do
      let(:lexicon) { FactoryGirl.create(:lexicon, name: "MyLexicon", description: "Cool", user: john) }

      before(:each) do
        put api_user_lexicon_path(john, lexicon), lexicon: params
      end

      it "should return forbidden status code" do
        expect(response).to have_http_status :forbidden
      end

      it "should NOT update the lexicon attributes" do
        lex = Lexicon.find_by id: lexicon.id
        expect(lex.name).to eq "MyLexicon"
        expect(lex.description).to eq "Cool"
      end
    end
  end

  describe "DELETE /api/users/:user_id/lexicons/:id" do
    context "current user is the owner" do
      before(:each) do
        lex = FactoryGirl.create(:lexicon, name: "MyLexicon", user: bob)
        delete api_user_lexicon_path(bob, lex)
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
        lex = FactoryGirl.create(:lexicon, name: "MyLexicon", user: john)
        delete api_user_lexicon_path(john, lex)
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
