class StockFetcherJob < ApplicationJob
  queue_as :default

  def perform(stock_symbol)
    # Example: Fetch stock data from an API (replace with real API)
    stock_data = fetch_stock_data(stock_symbol)
    
    # Process stock_data - for example, save to DB or calculate valuation
    # Stock.create_or_update_by_symbol(stock_symbol, stock_data)

    puts "Fetched and processed data for #{stock_symbol}: #{stock_data.inspect}"
  end

  private

  def fetch_stock_data(symbol)
    # You can use Net::HTTP, HTTParty, or any HTTP client gem here
    # This is a stubbed example returning fake data:
    {
      price: rand(100..500),
      pe_ratio: rand(5..30),
      timestamp: Time.now
    }
  end
end
