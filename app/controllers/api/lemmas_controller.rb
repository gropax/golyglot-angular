module Api
  class LemmasController < BaseController
    respond_to :json

    before_action :set_lexical_entry_and_lexicon, only: [:update]
    before_action :set_user

    def update
      binding.pry
      @lemma.update_attributes(representations_attributes: lemma_params[:representations])
      if @lexical_entry.save
        render json: @lemma.to_builder.target!, status: :ok
      else
        render json: @lemma.errors, status: :unprocessable_entity
      end
    end

    private

      def set_lexical_entry_and_lexicon
        @lexical_entry = LexicalEntry.find params[:lexical_entry_id] || params[:id]
        @lexicon = @lexical_entry.lexicon
        @lemma = @lexical_entry.lemma
      end

      def set_user
        @user = @lexicon.user
      end

      def lemma_params
        params.require(:lemma).permit(representations: [:id, :script, :orthography_name, :written_form, :_destroy])
      end

      def current_user_is_owner?
        @user == @current_user
      end

  end
end
