class ChangeNameToBeUniqueInChains < ActiveRecord::Migration[5.2]
  def up
    change_column :chains, :name, :string, unique: true
  end

  def down
    change_column :chains, :name, :string, unique: false
  end
end
