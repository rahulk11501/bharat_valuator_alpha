class Api::StocksController < ApplicationController
  def index
    # Return list of some stocks
    stocks = [
      { symbol: "RELIANCE", name: "Reliance Industries" },
      { symbol: "TCS", name: "Tata Consultancy Services" },
      { symbol: "INFY", name: "Infosys" }
    ]
    render json: stocks
  end

  def show
    symbol = params[:id].upcase
    api_key = ENV["ALPHA_VANTAGE_API_KEY"]
    url = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=#{symbol}&apikey=#{api_key}"

    response = HTTP.get(url)
    data = response.parse

    # Replace `current_user` with your actual auth method
    is_in_watchlist = current_user&.watchlists&.exists?(stock_symbol: symbol)

    if false # Replace with: if data["Monthly Adjusted Time Series"]
      history = data["Monthly Adjusted Time Series"].map do |date, values|
        {
          date: date,
          close: values["4. close"].to_f
        }
      end.sort_by { |h| h[:date] }

      render json: { symbol: symbol, history: history, watchlist: is_in_watchlist }
    else
      static_history = [
        { date: "2024-04-30", close: rand(100..200).to_f },
        { date: "2024-03-31", close: rand(100..200).to_f },
        { date: "2024-02-29", close: rand(100..200).to_f },
        { date: "2024-01-31", close: rand(100..200).to_f },
        { date: "2023-12-31", close: rand(100..200).to_f }
      ]

      render json: {
        symbol: symbol,
        history: static_history,
        watchlist: is_in_watchlist
      }
    end
  end


  def search
    keyword = params[:query]
    url = URI("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=#{keyword}&apikey=#{ENV['ALPHA_VANTAGE_API_KEY']}")

    response = HTTP.get(url)
    render json: JSON.parse(response)
  end
end
