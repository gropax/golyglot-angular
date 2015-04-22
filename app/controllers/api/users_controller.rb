module Api
  class UsersController < BaseController
    respond_to :json

    def index
      @user = User.find_by({name: params[:name]})
      render :show
    end

  end
end
