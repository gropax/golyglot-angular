require 'rails_helper'
require 'auth_token'

RSpec.describe LexicalEntry, :type => :request do

  current_user :bob

  describe "POST /api/lexicons/:id/lexical_entries" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }

    before(:each) do
      post api_lexicon_lexical_entries_path(lexicon), {lexical_entry: entry_data}
    end

    it "should return a created status code" do
      expect(response).to have_http_status(:created)
    end

    it "should create a lexical entry in database" do
      entry = LexicalEntry.find_by lexicon_id: lexicon.id
      pinyin = entry.lemma.representations.last.written_form
      expect(pinyin).to eq "wo3"
    end

    let(:entry_data) {
      { language: 'cmn',
        lexicon_id: lexicon.id,
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
              written_form: "wo3" }]}}
    }

  end

end
