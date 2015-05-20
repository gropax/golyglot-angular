require 'rails_helper'
require 'auth_token'

RSpec.describe LexicalEntry, :type => :request do

  current_user :bob

  describe "GET /api/lexicons/:id/lexical_entries" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }

    context "with a language param" do
      context "when valid" do
        before(:each) do
          # 5 arabic + 10 mandarin + 5 arabic
          FactoryGirl.create_list(:lexical_entry, 5, lexicon: lexicon, language: 'ara')
          FactoryGirl.create_list(:lexical_entry, 20, lexicon: lexicon, language: 'cmn')
          FactoryGirl.create_list(:lexical_entry, 5, lexicon: lexicon, language: 'ara')

          get api_lexicon_lexical_entries_path(lexicon, language: 'cmn')
        end

        it "should return a success status code" do
          expect(response).to have_http_status(:success)
        end

        it "should return 10 lexical entries" do
          expect(json.size).to eq 10
        end

        it "should only return mandarin entries" do
          languages = json.map { |entry| entry['language'] }.uniq
          expect(languages.size).to eq 1
          expect(languages.first).to eq 'cmn'
        end

        it "should sort entries from recent to old" do
          times = json.map { |entry| Time.parse(entry['createdAt']).to_i }
          expect(times.sort).to eq times
        end

        it "should return the most recent lexical entries" do
          all_times = LexicalEntry.all.desc(:created_at).map { |e| e.created_at.to_json.tr('"', '') }
          times = json.map { |entry| entry['createdAt'] }

          expect(all_times[5..14]).to eq times
        end
      end

      context "when invalid" do
        it "should return BAD REQUEST status code" do
          get api_lexicon_lexical_entries_path(lexicon)
          expect(response).to have_http_status :bad_request
        end
      end
    end

    context "with query params" do
      context "when valid" do
        before(:each) do
          FactoryGirl.create_list(:lexical_entry, 10, lexicon: lexicon, language: 'cmn')
          eng_lexical_entry(lexicon, 'query')
          @match1 = cmn_lexical_entry(lexicon, 'query', '...', '...')
          @match2 = cmn_lexical_entry(lexicon, '...', '...', 'abcquery123')

          get api_lexicon_lexical_entries_path(lexicon, language: 'cmn', query: 'query')
        end

        it "should return a success status code" do
          expect(response).to have_http_status(:success)
        end

        it "should return lexical entries that match query" do
          ids = json.map { |entry| entry['id'] }
          expected_ids = [@match1, @match2].map { |entry| entry.id.to_s }
          expect(ids).to match_array expected_ids
        end
      end

      context "when invalid" do
        # @todo
      end
    end
  end

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
        lexicon_id: lexicon.id.to_s,
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


  describe "GET /api/lexicons/:lexicon_id/lexical_entries/:id" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }
    let(:lexical_entry) { FactoryGirl.create(:cmn_lexical_entry, lexicon: lexicon) }

    context "with a valid `language` param" do
      before(:each) do
        get api_lexicon_lexical_entry_path(lexicon, lexical_entry)
      end

      it "should return a success status code" do
        expect(response).to have_http_status(:success)
      end

      it "returns lexical entry with lemma" do
        expect(json["lemma"]).not_to be_nil
      end

      it "returns lexical entry with senses"
    end
  end


  describe "GET /api/lexicons/:lexicon_id/lexical_entries/:id" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }
    let(:lexical_entry) { FactoryGirl.create(:lexical_entry, lexicon: lexicon) }

    context "with a valid `language` param" do
      before(:each) do
        get api_lexicon_lexical_entry_path(lexicon, lexical_entry)
      end

      it "should return a success status code" do
        expect(response).to have_http_status(:success)
      end

      it "returns lexical entry with lemma" do
        expect(json["lemma"]).not_to be_nil
      end

      it "returns lexical entry with senses"
    end
  end

  describe "DELETE /api/lexicons/:lexicon_id/lexical_entries/:id" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }
    let(:lexical_entry) { FactoryGirl.create(:cmn_lexical_entry, lexicon: lexicon) }

    context "with a valid `language` param" do
      before(:each) do
        delete api_lexicon_lexical_entry_path(lexicon, lexical_entry)
      end

      it "should return a success status code" do
        expect(response).to have_http_status(:success)
      end

      it "should delete the lexical entry" do
        expect(LexicalEntry.count).to be 0
      end
    end
  end

end
