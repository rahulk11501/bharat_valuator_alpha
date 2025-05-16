require 'http'

class StockFetcherJob < ApplicationJob
  queue_as :default

  API_KEY = ENV['ALPHA_VANTAGE_API_KEY']
  BASE_URL = "https://www.alphavantage.co/query"

  def perform(stock_symbol)
    puts "Fetching stock data for #{stock_symbol}..."
    stock_data = fetch_stock_data(stock_symbol)
    return unless stock_data

    stock = Stock.find_or_initialize_by(symbol: stock_symbol)
    stock.price = stock_data[:price]
    stock.pe_ratio = stock_data[:pe_ratio]
    stock.fetched_at = Time.now
    stock.save!
  end

  private

  def fetch_stock_data(symbol)
    response = HTTP.get(BASE_URL, params: {
      function: "OVERVIEW",
      symbol: symbol,
      apikey: API_KEY
    })

    puts "Response status: #{response.status}"

    return nil unless response.status.success?

    data = response.parse

    # Alpha Vantage returns a hash with key data, e.g.:
    # "PERatio" and "PreviousClose" fields
    {
      price: fetch_price(symbol),
      pe_ratio: data["PERatio"]&.to_f
    }

    puts "Fetched stock data: #{data}, price: #{data['PreviousClose']}, PE Ratio: #{data['PERatio']}"
  rescue StandardError => e
    Rails.logger.error("Failed to fetch stock data for #{symbol}: #{e.message}")
    nil
  end

  def fetch_price(symbol)
    response = HTTP.get(BASE_URL, params: {
      function: "GLOBAL_QUOTE",
      symbol: symbol,
      apikey: API_KEY
    })

    puts "Response status for fetch_price: #{response.status}"

    return nil unless response.status.success?

    puts "Response body for fetch_price: #{response.body.to_s}"
    data = response.parse
    puts "Response data for fetch_price: #{data}"
    data.dig("Global Quote", "05. price")&.to_f
    
    puts "Fetched price: #{data.dig('Global Quote', '05. price')}"
  end
end
