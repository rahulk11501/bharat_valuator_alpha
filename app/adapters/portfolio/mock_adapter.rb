# app/adapters/portfolio/mock_adapter.rb
module Portfolio
  class MockAdapter
    def initialize(user); end

    def fetch_portfolio
      [
        { symbol: "RELIANCE.BSE", quantity: 10, avg_price: 2400 },
        { symbol: "TCS.BSE", quantity: 5, avg_price: 3300 },
        { symbol: "INFY.BSE", quantity: 8, avg_price: 1450 }
      ]
    end
  end
end
