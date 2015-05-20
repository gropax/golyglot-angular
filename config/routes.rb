Rails.application.routes.draw do
  root "application#index"

  namespace :api do
    #resources "parts_of_speech", except: [:new, :edit]
    #resources "lexical_entries", except: [:new, :edit]

    resources "users", only: [:show, :index] do
      resources "lexicons", only: [:index, :create, :show, :update, :destroy]
    end

    resources "lexicons", only: [] do
      resources "lexical_entries", only: [:index, :create, :show]
    end

    resources "lexical_entries" do
      resource "lemma", only: [:update]
      get "search", on: :collection
    end
  end

  match 'auth/sign_up', to: 'auth#sign_up', via: :post
  match 'auth/sign_in', to: 'auth#sign_in', via: :post
  match 'auth/token_status', to: 'auth#token_status', via: :get

  match '*path' => 'application#index', via: :get
end
