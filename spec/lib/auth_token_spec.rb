require 'rails_helper'
require 'auth_token'

RSpec.describe AuthToken do

  let(:payload) { {"user" => "bougle", "id" => 123} }

  it "encode and decode JWT token" do
    token = AuthToken.issue_token(payload)
    result, header = AuthToken.valid?(token)
    new_payload = result.slice(*payload.keys)
    expect(new_payload).to eq(payload)
  end

  it "returns false if Token is invalid" do
    token = "invalid.fake.token"
    expect(AuthToken.valid?(token)).to be false
  end

end
