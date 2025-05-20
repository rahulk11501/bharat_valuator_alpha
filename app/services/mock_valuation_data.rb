# app/services/mock_valuation_data.rb
class MockValuationData
  def initialize(symbol)
    @symbol = symbol
  end

  def fetch
    {
      eps: rand(1.0..10.0).round(2),
      pe_ratio: rand(5.0..25.0).round(2),
      revenue: rand(1_000_000..10_000_000),
      dividend_yield: rand(0.0..5.0).round(2),
      growth_rate: rand(2.0..20.0).round(2),
      book_value: rand(10.0..100.0).round(2),
      debt_equity: rand(0.1..2.0).round(2)
    }
  end
end
