module Api
  class LexiconsController < BaseController
    respond_to :json

    def create
      @lexicon = Lexicon.new(lexicon_params)

      if @lexicon.save
        render :show, status: :created
      else
        render json: @lexicon.errors, status: :unprocessable_entity
      end
    end

    private

      def lexicon_params
        hsh = params.require(:lexicon).permit(:name, :description)
        hsh[:user] = user
        hsh
      end

      def user
        user = User.find_by({id: params[:user_id]})
        if user == @current_user
          user
        else
          render status: :forbidden
        end
      end
  end
end
