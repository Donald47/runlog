class CreateAtheletes < ActiveRecord::Migration[5.2]
  def change
    enable_extension 'uuid-ossp'
    create_table :atheletes, id: :uuid, default: -> { "uuid_generate_v4()" } do |t|
      t.string :email, null: false
      t.string :encrypted_password, null: false
      t.timestamps
      t.index :id, unique: true, using: :btree
      t.index :email, unique: true, using: :btree
    end
  end
end
