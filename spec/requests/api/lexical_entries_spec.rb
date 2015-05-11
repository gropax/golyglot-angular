require 'rails_helper'
require 'auth_token'

RSpec.describe LexicalEntry, :type => :request do

  current_user :bob

  describe "GET /api/lexicons/:id/lexical_entries" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }

    context "with a valid `language` param" do
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
        times = json.map { |entry| Time.parse(entry['created_at']).to_i }
        expect(times.sort).to eq times
      end

      it "should return the most recent lexical entries" do
        all_times = LexicalEntry.all.desc(:created_at).map { |e| e.created_at.to_json.tr('"', '') }
        times = json.map { |entry| entry['created_at'] }

        expect(all_times[5..14]).to eq times
      end
    end

    context "without valid `language` param" do
      it "should return BAD REQUEST status code" do
        get api_lexicon_lexical_entries_path(lexicon)
        expect(response).to have_http_status :bad_request
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


  # @note
  #     For the time being, use `representation` key in request, but need
  #     `representations_attributes` in models.
  #
  describe "PUT /api/lexical-entries/:id/lemma" do
    let(:lexicon) { FactoryGirl.create(:lexicon, user: bob) }
    let(:lexical_entry) { FactoryGirl.create(:cmn_lexical_entry, lexicon: lexicon) }
    let(:representations) { lexical_entry.lemma.representations }
    let(:simplified) { representations.detect { |r| r.script == "Hans" } }
    let(:traditional) { representations.detect { |r| r.script == "Hant" } }
    let(:pinyin) { representations.detect { |r| r.script == "Latn" } }

    let(:lemma_params) {
      {
        id: lexical_entry.lemma.id.to_s,
        lexical_entry_id: lexical_entry.id.to_s,
        representations: [
          { # Update element
            id: pinyin.id,
            written_form: "ni3hao3ma"
          },
          { # Destroy element
            id: traditional.id,
            _destroy: true
          },
          { # Create element
            script: 'Arab',
            orthography_name: 'arab',
            written_form: 'alien'
          },
        ]
      }
    }

    before(:each) do
      put api_lexical_entry_lemma_path(lexical_entry), {lemma: lemma_params}
      @reprs = LexicalEntry.first.lemma.representations
    end

    it "should return a created status code" do
      expect(response).to have_http_status(:ok)
    end

    it "should leave one element untouched" do
      s = @reprs.find(simplified.id)
      expect(s.written_form).to eq "XX"
    end

    it "should update one element" do
      p = @reprs.find(pinyin.id)
      expect(p.written_form).to eq "ni3hao3ma"
    end

    it "should destroy one element" do
      t = @reprs.where({script: 'Hant'}).first
      expect(t).to be nil
    end

    it "should create one element" do
      t = @reprs.find_by({script: 'Arab'})
      expect(t.written_form).to eq "alien"
    end
  end

end
