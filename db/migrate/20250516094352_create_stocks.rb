class CreateStocks < ActiveRecord::Migration[8.0]
  def change
    create_table :stocks do |t|
      t.string :symbol
      t.decimal :price
      t.decimal :pe_ratio
      t.datetime :fetched_at

      t.timestamps
    end
  end
end
