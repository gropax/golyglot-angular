Rails.application.routes.draw do
  root "application#index"

  namespace :api do
    resources "lexicons", except: [:new, :edit]
    resources "parts_of_speech", except: [:new, :edit]
    resources "lexical_entries", except: [:new, :edit]
  end

  match 'auth/sign_up', to: 'auth#sign_up', via: :post
  match 'auth/sign_in', to: 'auth#sign_in', via: :post
  match 'auth/token_status', to: 'auth#token_status', via: :get

  match '*path' => 'application#index', via: :get
end
