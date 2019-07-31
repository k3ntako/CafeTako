class AddPasswordDigestToUsers < ActiveRecord::Migration[5.2]
  def up
    add_column :users, :password_digest, :string
    remove_column :users, :encrypted_password, null: false
    change_column_default :users, :email, nil
  end

  def down
    remove_column :users, :password_digest
    add_column :users, :encrypted_password, :string, null: false, default: ""
    change_column_default :users, :email, ""
  end
end
