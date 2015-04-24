require 'jwt'

module RequestHelpers
  def json
    @json ||= JSON.parse(response.body)
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
      new_headers = headers.merge({'Accept' => 'application/json'})
      super(url, data, new_headers)
    end
  end
end
