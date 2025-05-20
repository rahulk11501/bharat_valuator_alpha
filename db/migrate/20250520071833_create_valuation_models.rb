class CreateValuationModels < ActiveRecord::Migration[8.0]
  def change
    create_table :valuation_models do |t|
      t.string :name, null: false
      t.text :formula, null: false
      t.boolean :predefined, default: false
      t.references :user, foreign_key: true, null: true  # null for predefined models

      t.timestamps
    end
  end
end
