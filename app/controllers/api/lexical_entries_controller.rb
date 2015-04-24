module Api
  class LexicalEntriesController < BaseController
    respond_to :json

    before_action :set_lexicon
    before_action :set_user
    #before_action :set_lexical_entry, except: [:index, :create]

    def create
      @lexical_entry = LexicalEntry.new(lexical_entry_params)

      if @lexical_entry.save
        render :show, status: :created
      else
        render json: @lexicon.errors, status: :unprocessable_entity
      end
    end


    private

      def lexical_entry_params
        params.require(:lexical_entry)
          .permit(:language, :lexicon_id,
                   lemma: {representations: [:script, :orthography_name, :written_form]})
      end

      def set_lexical_entry
        @lexical_entry = LexicalEntry.find_by({lexicon_id: params[:lexicon_id], id: params[:id]})
      end

      def set_lexicon
        @lexicon = Lexicon.find_by({id: params[:lexicon_id]})
      end

      def set_user
        @user = User.find_by({id: @lexicon.user_id})
      end

      def current_user_is_owner?
        @user == @current_user
      end
  end
end
