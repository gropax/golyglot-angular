require 'auth_token'

class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sign_up
    @user = User.new(auth_params)
    if @user.save
      @token = AuthToken.issue_token({user_id: @user.id})
      render "auth/authenticate", format: :json
    else
      render json: { errors: @user.errors }
    end
  end

  def sign_in
    @user = User.find_by(email: auth_params[:email].downcase)
    if @user.authenticate(auth_params[:password])
      @token = AuthToken.issue_token({user_id: @user.id})
      render "auth/authenticate", format: :json
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  def token_status
    if AuthToken.valid?(auth_params[:token])
      head 200
    else
      head 401
    end
  end

  private

  # @fixme
  #     Unatural collection of params...
  #
  def auth_params
    params.require(:auth).permit(:email, :password, :password_confirmation, :accept_terms, :token)
  end
end
