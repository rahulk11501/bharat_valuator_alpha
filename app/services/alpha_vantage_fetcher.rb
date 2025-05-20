
# app/services/alpha_vantage_fetcher.rb
class AlphaVantageFetcher
  def initialize(symbol)
    @symbol = symbol
    @api_key = ENV["ALPHA_VANTAGE_API_KEY"]
  end

  def fetch
    # You'll hit different endpoints here and parse each response
    overview = fetch_overview
    earnings = fetch_earnings

    {
      eps: overview["EPS"].to_f,
      pe_ratio: overview["PERatio"].to_f,
      revenue: overview["RevenueTTM"].to_f,
      dividend_yield: overview["DividendYield"].to_f,
      growth_rate: calculate_growth_rate(earnings),
      book_value: overview["BookValue"].to_f,
      debt_equity: overview["DebtEquity"].to_f
    }
  end

  private

  def fetch_overview
    url = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=#{@symbol}&apikey=#{@api_key}"
    response = HTTP.get(url).parse
    raise "Failed to fetch overview" if response["Symbol"].nil?

    response
  end

  def fetch_earnings
    url = "https://www.alphavantage.co/query?function=EARNINGS&symbol=#{@symbol}&apikey=#{@api_key}"
    response = HTTP.get(url).parse
    response["annualEarnings"] || []
  end

  def calculate_growth_rate(earnings)
    return 0.0 if earnings.size < 2
    latest = earnings[0]["reportedEPS"].to_f
    oldest = earnings[-1]["reportedEPS"].to_f
    years = earnings.size - 1

    return 0.0 if oldest == 0
    (((latest / oldest)**(1.0 / years)) - 1) * 100
  end
end
