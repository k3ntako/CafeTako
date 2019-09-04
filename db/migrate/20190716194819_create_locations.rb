DEFAULT_HOURS = {
  sunday: nil,
  monday: nil,
  tuesday: nil,
  wednesday: nil,
  thursday: nil,
  friday: nil,
  saturday: nil,
}

DEFAULT_ADDRESS = {
  address_part_1: nil,
  address_part_2: nil,
  address_part_3: nil,
  city: nil,
  state: nil,
  zipcode: nil,
  country: nil,
}

class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.string :name, null: false
      t.jsonb :address, null: false, default: DEFAULT_ADDRESS
      t.jsonb :business_hours, null: false, default: DEFAULT_HOURS

      t.timestamps null: false
    end
  end
end
