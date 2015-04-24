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
      post "api/lexicons/#{@lexicon.id}/lexical_entries.json",
        {lexical_entry: lexical_entry}, @headers

      @json = JSON.parse(response.body)
    end

    it "should return a created status code" do
      expect(response).to have_http_status(:created)
    end

    it "should create a lexical entry in database" do
      #binding.pry
      lexical_entry = LexicalEntry.find_by({lexicon_id: @lexicon.id})
      pinyin = lexical_entry.lemma.representations.last.written_form
      expect(pinyin).to eq "wo3"
    end
  end

end
