# config/routes.rb
Rails.application.routes.draw do
  devise_for :users
  root "react#index"
  get "*path", to: "react#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  namespace :api do
    resources :stocks, only: [ :index, :show ] do
      collection do
        get "search", to: "stocks#search"
      end
    end

    resources :watchlists, only: [ :index, :create, :destroy ]

    resources :valuations, only: [ :index, :create, :destroy ] do
      collection do
        post :evaluate
      end
    end
  end
end
