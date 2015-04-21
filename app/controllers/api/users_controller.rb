module Api
  class UsersController < BaseController
    respond_to :json

    def lexicons
      user = User.find_by({id: params[:user_id]})
      @lexicons = user.lexicons
    end

  end
end
