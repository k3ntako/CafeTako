DEFAULT_HOURS = {
  sunday: nil,
  monday: nil,
  tuesday: nil,
  wednesday: nil,
  thursday: nil,
  friday: nil,
  saturday: nil,
}

class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.string :address, null: false, unique: true
      t.jsonb :business_hours, null: false, default: DEFAULT_HOURS

      t.timestamps null: false
    end
  end
end
