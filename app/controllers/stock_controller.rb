# app/controllers/stocks_controller.rb
class StocksController < ApplicationController
  def valuation_history
    symbol = params[:symbol]
    range = params[:range] || '1y'

    service = AlphaVantageService.new(api_key: ENV['ALPHA_VANTAGE_API_KEY'])
    data = service.fetch_valuation_history(symbol, range)

    if data.empty?
      render json: { error: "No data found or API error" }, status: :not_found
    else
      render json: data
    end
  end
end
