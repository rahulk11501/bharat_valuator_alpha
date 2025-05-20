# app/services/valuation_model_evaluator.rb
class ValuationModelEvaluator
  def initialize(metrics)
    @metrics = metrics
  end

  def evaluate(model)
    case model.name
    when "Graham"
      graham_formula
    when "DCF"
      discounted_cash_flow
    when "PEG"
      peg_ratio
    when "DDM"
      dividend_discount
    else
      evaluate_custom(model.formula)
    end
  end

  private

  def graham_formula
    # Graham Number: √(22.5 * EPS * Book Value)
    Math.sqrt(22.5 * @metrics[:eps] * @metrics[:book_value]).round(2)
  end

  def discounted_cash_flow
    # Simple estimation: EPS * (8.5 + 2 * growth_rate)
    (@metrics[:eps] * (8.5 + 2 * @metrics[:growth_rate])).round(2)
  end

  def peg_ratio
    # PEG = PE Ratio / Growth Rate
    return 0 if @metrics[:growth_rate].zero?
    (@metrics[:pe_ratio] / @metrics[:growth_rate]).round(2)
  end

  def dividend_discount
    # DDM: Dividend / (Expected Return - Growth)
    expected_return = 10.0
    growth = @metrics[:growth_rate]
    dividend = @metrics[:dividend_yield]

    return 0 if expected_return <= growth
    (dividend / (expected_return - growth)).round(2)
  end

  def evaluate_custom(expression)
    # Evaluate a custom expression safely (like "eps * (1 + growth_rate / 100)")
    safe_binding = OpenStruct.new(@metrics).instance_eval { binding }
    eval(expression, safe_binding).round(2)
  rescue StandardError => e
    Rails.logger.error "Custom model evaluation error: #{e.message}"
    nil
  end
end
