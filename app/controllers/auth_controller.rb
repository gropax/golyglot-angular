require 'auth_token'

class AuthController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sign_up
    binding.pry
    @user = User.new(user_params)
    if @user.save
      @token = AuthToken.issue_token({user_id: @user.id})
      render "auth/authenticate"
    else
      render json: { errors: @user.errors }
    end
  end

  def sign_in
    @user = User.find_by(email: params[:email].downcase)
    if @user.authenticate(params[:password])
      @token = AuthToken.issue_token({user_id: @user.id})
      render "auth/authenticate"
    else
      render json: { error: "Invalid email or password." }, status: :unauthorized
    end
  end

  def token_status
    if AuthToken.valid?(params[:token])
      head 200
    else
      head 401
    end
  end

  private

  def user_params
    params.permit(:email, :password, :password_confirmation, :accept_terms)
  end
end
