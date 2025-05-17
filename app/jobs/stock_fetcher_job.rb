require "http"

class StockFetcherJob < ApplicationJob
  queue_as :default

  API_KEY = ENV["ALPHA_VANTAGE_API_KEY"]
  BASE_URL = "https://www.alphavantage.co/query"

  def perform(keyword)
    matches = fetch_matches(keyword)
    return unless matches

    puts "Fetched matches: #{matches[0].inspect}"
    puts "Fetched matches count: #{matches.size}"
    matches.each do |match|
      symbol = match["1. symbol"]
      name   = match["2. name"]

      next unless symbol&.ends_with?(".NS")  # Only NSE symbols

      price = fetch_price(symbol)
      pe_ratio = fetch_pe_ratio(symbol)

      next unless price

      stock = Stock.find_or_initialize_by(symbol: symbol)
      stock.name = name
      stock.price = price
      stock.pe_ratio = pe_ratio
      stock.fetched_at = Time.current
      stock.save!
    end
  end

  private

  def fetch_matches(keyword)
    response = HTTP.get(BASE_URL, params: {
      function: "SYMBOL_SEARCH",
      keywords: keyword,
      apikey: API_KEY
    })

    return nil unless response.status.success?

    data = response.parse
    data["bestMatches"]
    # Filter out matches that do not end with '.NS'
  rescue StandardError => e
    Rails.logger.error("Failed to fetch matches for #{keyword}: #{e.message}")
    nil
  end

  def fetch_price(symbol)
    response = HTTP.get(BASE_URL, params: {
      function: "GLOBAL_QUOTE",
      symbol: symbol,
      apikey: API_KEY
    })

    return nil unless response.status.success?

    data = response.parse
    data.dig("Global Quote", "05. price")&.to_f
  rescue StandardError => e
    Rails.logger.error("Failed to fetch price for #{symbol}")
    nil
  end

  def fetch_pe_ratio(symbol)
    response = HTTP.get(BASE_URL, params: {
      function: "OVERVIEW",
      symbol: symbol,
      apikey: API_KEY
    })

    return nil unless response.status.success?
    puts response.status, response.body
    data = response.parse
    data["PERatio"]&.to_f
  rescue StandardError => e
    Rails.logger.error("Failed to fetch PE Ratio for #{symbol}")
    nil
  end
end
