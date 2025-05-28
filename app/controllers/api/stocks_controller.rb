class Api::StocksController < ApplicationController
  def index
    # Use dummy stock list cached at startup
    render json: DataStore.stock_list
  end

  def show
    symbol = params[:id].upcase

    # For demo/demo mode, serve from dummy time series
    time_series = DataStore.time_series_sample[symbol]

    if time_series.present?
      # Convert to array of hashes sorted by date ascending
      history = time_series.map do |date, values|
        { date: date, close: values["close"] || values[:close] }
      end.sort_by { |h| h[:date] }

      # Simulate watchlist check (replace with real current_user logic)
      is_in_watchlist = current_user&.watchlists&.exists?(stock_symbol: symbol)

      render json: { symbol: symbol, history: history, watchlist: is_in_watchlist }
    else
      render json: { error: "No data found for symbol #{symbol}" }, status: :not_found
    end
  end

  def search
    keyword = params[:query]
    base_url = DataStore.alpha_vantage_config["base_url"]
    search_function = DataStore.alpha_vantage_config.dig("functions", "search")

    url = "#{base_url}?function=#{search_function}&keywords=#{keyword}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}"

    response = HTTP.get(url)
    render json: response.parse
  end
end
