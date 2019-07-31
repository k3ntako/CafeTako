class AddCoordinatesToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :lat, :decimal, null: false, default: 0
    add_column :locations, :lng, :decimal, null: false, default: 0
  end
end
