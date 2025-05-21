# app/services/stock_symbol_fetcher.rb
class StockSymbolFetcher
  def self.fetch_all
    if Rails.env.development?
      [ "RELIANCE", "TCS", "INFY" ]
    else
      # Stub: Replace with real NSE/BSE symbol fetch logic
      # Example using CSV or API
      %w[RELIANCE TCS INFY HDFCBANK ICICIBANK BAJFINANCE HCLTECH ITC]
    end
  end
end
