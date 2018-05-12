class CreateRuns < ActiveRecord::Migration[5.2]
  def change
    create_table :runs, id: :uuid, default: -> { "uuid_generate_v4()" } do |t|
      t.uuid :athelete_id, null: false
      t.decimal :distance_in_meters, null: false
      t.decimal :time_in_seconds, null: false
      t.decimal :calories_burned, null: false
      t.timestamps
      t.index :id, unique: true, using: :btree
      t.index :athelete_id, using: :btree
    end
  end
end
