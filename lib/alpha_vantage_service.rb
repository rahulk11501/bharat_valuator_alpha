require 'http'

class AlphaVantageService
  BASE_URL = "https://www.alphavantage.co/query"

  def initialize(api_key:)
    @api_key = api_key
  end

  # range can be '1w', '1m', '3m', '6m', '1y', '3y', '5y'
  # Returns array of { date: Date, pe_ratio: Float }
  def fetch_valuation_history(symbol, range = '1y')
    response = HTTP.get(BASE_URL, params: {
      function: "TIME_SERIES_MONTHLY_ADJUSTED",
      symbol: symbol,
      apikey: @api_key
    })

    return [] unless response.status.success?

    data = response.parse
    series = data["Monthly Adjusted Time Series"]
    return [] unless series

    filtered_data = filter_by_range(series, range)

    # Extract only date and PE ratio (we'll treat 'adjusted close' as price proxy; PE ratio may not be directly available here)
    # Alpha Vantage does not provide PE history in this endpoint,
    # so you'd need another API or to calculate approx PE if you have earnings.

    # For demo, just return adjusted close price as valuation proxy:
    filtered_data.map do |date_str, values|
      {
        date: Date.parse(date_str),
        adjusted_close: values["5. adjusted close"].to_f
        # pe_ratio: ... # If you have PE data from another endpoint, merge here
      }
    end.sort_by { |h| h[:date] }
  end

  private

  # Filters the time series hash to only include dates within the requested range
  def filter_by_range(series, range)
    end_date = Date.today
    start_date = case range.downcase
                 when '1w' then end_date - 7
                 when '1m' then end_date << 1   # 1 month ago
                 when '3m' then end_date << 3
                 when '6m' then end_date << 6
                 when '1y' then end_date << 12
                 when '3y' then end_date << 36
                 when '5y' then end_date << 60
                 else end_date << 12
                 end

    series.select do |date_str, _|
      date = Date.parse(date_str)
      date >= start_date && date <= end_date
    end
  end
end
