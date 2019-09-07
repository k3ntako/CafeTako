class AddIsOpenToLocations < ActiveRecord::Migration[5.2]
  def change
    add_column :locations, :is_open, :boolean, null: false, default: true
  end
end
