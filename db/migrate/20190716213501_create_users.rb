class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false, unique: true, default: ""
      t.string :encrypted_password, null: false, default: ""

      t.string :first_name, null: false
      t.string :last_name, null: false
      t.date :birthday, null: false

      t.timestamps null: false
    end

    add_index :users, :email, unique: true
  end
end
