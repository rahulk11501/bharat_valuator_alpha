# app/adapters/portfolio_adapter.rb
class PortfolioAdapter
  def self.for(user)
    adapter_key = ENV.fetch("PORTFOLIO_ADAPTER", "mock")

    adapter_class = case adapter_key
                    when "zerodha" then Portfolio::ZerodhaAdapter
                    # when "angel" then Portfolio::AngelAdapter
                    else Portfolio::MockAdapter
                    end

    adapter_class.new(user)
  end
end
