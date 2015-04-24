require 'rails_helper'
require 'auth_token'

RSpec.describe LexicalEntry, :type => :request do

  before(:each) do
    @john = FactoryGirl.create(:john)
    @bob = FactoryGirl.create(:bob)
    token = AuthToken.issue_token({user_id: @bob.id.to_s})
    @headers = {'Authorization' => token}
  end


  describe "POST /api/lexicons/:id/lexical_entries" do
    before(:each) do
      @lexicon = FactoryGirl.create(:lexicon, user: @bob)

      lexical_entry = {
        language: 'cmn',
        lexicon_id: @lexicon.id,
        lemma: {
          representations: [
            {
              script: 'Hans',
              orthography_name: 'simplified',
              written_form: "xxx",
            },
            {
              script: 'Latn',
              orthography_name: 'pinyin',
              written_form: "wo3",
            },
          ]
        }
      }
      post api_lexicon_lexical_entries_path(@lexicon),
        {lexical_entry: lexical_entry}, @headers
    end

    it "should return a created status code" do
      expect(response).to have_http_status(:created)
    end

    it "should create a lexical entry in database" do
      lexical_entry = LexicalEntry.find_by({lexicon_id: @lexicon.id})
      pinyin = lexical_entry.lemma.representations.last.written_form
      expect(pinyin).to eq "wo3"
    end
  end

end
