json.user do
  json.partial! "auth/user", user: @user
end

json.token @token
