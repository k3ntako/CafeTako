class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :address, null: false, unique: true
      t.jsonb :hours, null: false, default: '{}'

      t.timestamps null: false
    end
  end
end
