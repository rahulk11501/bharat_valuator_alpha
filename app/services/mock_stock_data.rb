# app/services/mock_stock_data.rb
class MockStockData
  def self.for(symbol)
    {
      price: 2000 + rand(1000),
      eps: 50 + rand(50),
      book_value: 500 + rand(100),
      dividend_per_share: 10 + rand(5)
    }
  end
end
