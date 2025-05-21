class StockValuator
  def self.evaluate(stock_data, model, custom_formula = nil)
    return evaluate_custom(stock_data, custom_formula) if model == "custom" && custom_formula.present?

    case model
    when "pe_ratio"
      return nil if stock_data[:eps].to_f == 0
      (stock_data[:price].to_f / stock_data[:eps].to_f).round(2)
    when "pb_ratio"
      return nil if stock_data[:book_value].to_f == 0
      (stock_data[:price].to_f / stock_data[:book_value].to_f).round(2)
    when "dividend_yield"
      return nil if stock_data[:price].to_f == 0
      ((stock_data[:dividend_per_share].to_f / stock_data[:price].to_f) * 100).round(2)
    when "earnings_yield"
      return nil if stock_data[:price].to_f == 0
      ((stock_data[:eps].to_f / stock_data[:price].to_f) * 100).round(2)
    else
      nil
    end
  end

  def self.evaluate_custom(stock_data, formula)
    begin
      context = stock_data.transform_keys(&:to_s)
      expression = formula.dup
      context.each { |k, v| expression.gsub!(k, v.to_s) }
      result = eval(expression)
      result.round(2)
    rescue => e
      nil
    end
  end
end
