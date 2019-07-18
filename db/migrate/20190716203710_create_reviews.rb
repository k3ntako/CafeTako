class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :title, null: false
      t.integer :score, null: false
      t.boolean :music, default: nil
      t.string :review, default: ""
      t.integer :seating_count, default: nil, index: true
      t.integer :bathroom_count, default: nil, index: true
      t.integer :noise_level, default: nil, index: true
      t.integer :wifi_speed, default: nil, index: true
      t.integer :start_time
      t.integer :end_time

      t.belongs_to :location, null: false
      t.timestamps null: false
    end
  end
end
