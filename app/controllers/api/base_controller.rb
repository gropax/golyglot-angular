require 'auth_token'

module Api
  class BaseController < ApplicationController
    # Disable default CSRF token verification
    skip_before_action :verify_authenticity_token

    before_action :authenticate

    private

    def authenticate
      token = request.headers['Authorization']
      payload, _ = AuthToken.valid?(token)
      @current_user = User.find_by({id: payload['user_id']})
    rescue
      render json: {error: "Invalid Authorization Header"}, status: :unauthorized
    end
  end
end
