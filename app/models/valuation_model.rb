# app/models/valuation_model.rb
class ValuationModel < ApplicationRecord
  belongs_to :user, optional: true

  validates :name, presence: true
  validates :formula, presence: true
end
