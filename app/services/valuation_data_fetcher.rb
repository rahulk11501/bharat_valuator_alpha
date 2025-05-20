# app/services/valuation_data_fetcher.rb
class ValuationDataFetcher
  def initialize(symbol)
    @symbol = symbol.upcase
  end

  def fetch
    if Rails.env.production?
      AlphaVantageFetcher.new(@symbol).fetch
    else
      MockValuationData.new(@symbol).fetch
    end
  end
end
