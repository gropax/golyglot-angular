module Api
  class LexicalEntriesController < BaseController
    respond_to :json

    before_action :set_lexicon, only: [:index, :create]
    before_action :set_lexical_entry_and_lexicon, except: [:index, :create]
    before_action :set_user

    def index
      language = params[:language]
      unless language
        render json: {error: 'language required'}, status: :bad_request
      end

      if query = params[:query]
        @lexical_entries = LexicalEntry.search({language: language, query: query})
      else
        @lexical_entries = LexicalEntry.where({lexicon: @lexicon, language: language})
          .desc(:created_at).limit(10)
      end
    end

    def create
      @lexical_entry = LexicalEntry.new(lexical_entry_params)

      if @lexical_entry.save
        render :show, status: :created
      else
        render json: @lexical_entry.errors, status: :unprocessable_entity
      end
    end

    def show
      render json: @lexical_entry.to_builder.target!
    end

    def destroy
      @lexical_entry.destroy
      head :no_content
    end


    private

      def set_lexical_entry_and_lexicon
        @lexical_entry = LexicalEntry.find params[:lexical_entry_id] || params[:id]
        @lexicon = @lexical_entry.lexicon
        @lemma = @lexical_entry.lemma
      end

      def set_lexicon
        @lexicon = Lexicon.find params[:lexicon_id]
      end

      def set_user
        @user = @lexicon.user
      end

      def lexical_entry_params
        params.require(:lexical_entry)
          .permit(:language, :lexicon_id,
                   lemma: {representations: [:script, :orthography_name, :written_form]})
      end

      def current_user_is_owner?
        @user == @current_user
      end

  end
end
