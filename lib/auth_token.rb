require 'jwt'

module AuthToken
  EXPIRATION_TIME = 86400 # 24 hours

  def self.issue_token(payload)
    claims = {exp: Time.now.to_i + EXPIRATION_TIME}
    #claims = {}
    JWT.encode(payload.merge(claims), Rails.application.secrets.secret_key_base)
  end

  def self.valid?(token)
    JWT.decode(token, Rails.application.secrets.secret_key_base)
  rescue => e
    binding.pry
    false
  end
end
