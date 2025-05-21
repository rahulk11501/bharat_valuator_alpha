class StockDataFetcher
  def self.fetch(symbol)
    if Rails.env.development?
      MockStockData.for(symbol)
    else
      AlphaVantageService.fetch_quote(symbol)
    end
  end
end
