require 'rails_helper'
require 'auth_token'

RSpec.describe Lemma, :type => :request do

  current_user :bob

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
            id: pinyin.id.to_s,
            written_form: "ni3hao3ma"
          },
          { # Destroy element
            id: traditional.id.to_s,
            _destroy: '1'
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
