module Api
  class UsersController < BaseController
    respond_to :json

    def index
      @user = User.find_by({name: params[:name]})
      render :show
    end

    def lexicons
      if name = params[:name]
        @lexicon = Lexicon.find_by({user_id: params[:user_id], name: params[:name]})
        render 'api/lexicons/show', format: :json
      else
        user = User.find_by({id: params[:user_id]})
        @lexicons = user.lexicons
        render 'api/users/lexicons', format: :json
      end
    end

  end
end
