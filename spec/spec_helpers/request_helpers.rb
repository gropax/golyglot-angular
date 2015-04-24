require 'jwt'

module RequestHelpers
  def json
    @_json ||= JSON.parse(response.body)
  end

  def valid_token(payload = {})
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def invalid_token
    key = Rails.application.secrets.secret_key_base
    wrong_key = key.split('').shuffle.join
    JWT.encode({}, wrong_key)
  end

  [:get, :post, :put, :delete].each do |method|
    define_method(method) do |url, data = {}, headers = {}|
      new_headers = headers.dup

      # All request are JSON
      new_headers['Accept'] = 'application/json'

      # If a user is logged in, add auth token
      if @_token
        new_headers['Authorization'] = @_token
      end

      super(url, data, new_headers)
    end
  end


  attr_reader :current_user

  def authenticate(user)
    @current_user = user
    @_token = AuthToken.issue_token({user_id: user.id.to_s})
  end
end
