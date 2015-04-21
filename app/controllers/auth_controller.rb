require 'auth_token'

class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sign_up
    @user = User.new(auth_params)
    if @user.save
      issue_token
      render "auth/authenticate", format: :json
    else
      render json: { errors: @user.errors }, status: :bad_request
    end
  end

  def sign_in
    @user = User.find_by_email(auth_params[:email])
    if @user && @user.authenticate(auth_params[:password])
      issue_token
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

    def issue_token
      @token = AuthToken.issue_token({user_id: @user.id.to_s})
    end
end
