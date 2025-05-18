# config/routes.rb
Rails.application.routes.draw do
  devise_for :users
  root "react#index"
  get "*path", to: "react#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  namespace :api do
    resources :stocks, only: [ :index, :show ]
  end
end
