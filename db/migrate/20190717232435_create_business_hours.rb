class CreateBusinessHours < ActiveRecord::Migration[5.2]
  def change
    create_table :business_hours do |t|
      t.integer :open_time, default: nil, index: true
      t.integer :close_time, default: nil, index: true
    end
  end
end
