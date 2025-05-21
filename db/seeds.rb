ValuationModel.create!(
  [
    { name: "PE Ratio Based", formula: "price / eps" },
    { name: "DCF Model", formula: "free_cash_flow / (1 + discount_rate) ** years" },
    { name: "Dividend Discount Model", formula: "dividend / (required_return - growth_rate)" }
  ]
)
