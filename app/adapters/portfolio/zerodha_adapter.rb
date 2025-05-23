# app/adapters/portfolio/zerodha_adapter.rb
require 'net/http'
require 'json'

module Portfolio
  class ZerodhaAdapter
    def initialize(user)
      @token = user.zerodha_token
    end

    def fetch_portfolio
      uri = URI("https://api.kite.trade/holdings")
      req = Net::HTTP::Get.new(uri)
      req["Authorization"] = "token #{ENV['ZERODHA_API_KEY']}:#{@token}"

      res = Net::HTTP.start(uri.hostname, uri.port, use_ssl: true) { |http| http.request(req) }
      json = JSON.parse(res.body)

      json["data"].map do |stock|
        {
          symbol: stock["tradingsymbol"],
          quantity: stock["quantity"],
          avg_price: stock["average_price"]
        }
      end
    rescue
      []
    end
  end
end
