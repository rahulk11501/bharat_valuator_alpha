# config/routes.rb
Rails.application.routes.draw do
  get '/stocks/:symbol/valuation_history', to: 'stocks#valuation_history'
end
