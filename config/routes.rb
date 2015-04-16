Rails.application.routes.draw do
  root "application#index"

  resources "parts_of_speech"
  resources "lexical_entries"

  match 'auth/sign_up', to: 'auth#sign_up', via: :post
  match 'auth/sign_in', to: 'auth#sign_in', via: :post
  match 'auth/token_status', to: 'auth#token_status', via: :get
end
