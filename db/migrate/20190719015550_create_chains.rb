class CreateChains < ActiveRecord::Migration[5.2]
  def change
    create_table :chains do |t|
      t.string :name, null: false, index: true

      t.timestamps null: false
    end
  end
end
