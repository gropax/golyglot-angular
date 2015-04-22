module Api
  class LexiconsController < BaseController
    respond_to :json
    before_action :set_user
    before_action :set_lexicon, except: [:index, :create]

    def index
      if name = params[:name]
        @lexicon = Lexicon.find_by({user_id: params[:user_id], name: params[:name]})
        render 'api/lexicons/show', format: :json
      else
        @lexicons = @user.lexicons
        render 'api/users/lexicons', format: :json
      end
    end

    def create
      @lexicon = Lexicon.new(lexicon_params)

      if @lexicon.save
        render :show, status: :created
      else
        render json: @lexicon.errors, status: :unprocessable_entity
      end
    end

    def destroy
      if current_user_is_owner?
        @lexicon.destroy
        head :no_content
      else
        head :forbidden
      end
    end

    private

      def lexicon_params
        hsh = params.require(:lexicon).permit(:name, :description)
        hsh[:user] = @user
        hsh
      end

      def set_lexicon
        @lexicon = Lexicon.find_by({user_id: params[:user_id], id: params[:id]})
      end

      def set_user
        @user = User.find_by({id: params[:user_id]})
      end

      def current_user_is_owner?
        @user == @current_user
      end
  end
end
