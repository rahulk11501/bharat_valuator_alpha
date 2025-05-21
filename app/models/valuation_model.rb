# app/models/valuation_model.rb
class ValuationModel < ApplicationRecord
  belongs_to :user, optional: true

  # VALID_VARIABLES = %w[price eps book_value dividend_per_share].freeze
  # FORBIDDEN_PATTERNS = [/[^0-9a-zA-Z_+\-*/().\s]/, /eval|system|`|\$\{|\bend\b/]

  validates :name, presence: true
  validates :formula, presence: true
  # validate :formula_must_be_safe

  private

  def formula_must_be_safe
    # FORBIDDEN_PATTERNS.each do |pattern|
    #   if formula =~ pattern
    #     errors.add(:formula, 'contains forbidden characters or expressions')
    #     return
    #   end
    # end

    # variables = formula.scan(/[a-zA-Z_]+/).uniq
    # unknowns = variables - VALID_VARIABLES
    # if unknowns.any?
    #   errors.add(:formula, "contains unknown variables: #{unknowns.join(', ')}")
    # end
  end
end
