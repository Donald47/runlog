# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_05_06_115034) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "atheletes", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_atheletes_on_email", unique: true
    t.index ["id"], name: "index_atheletes_on_id", unique: true
  end

  create_table "runs", id: :uuid, default: -> { "uuid_generate_v4()" }, force: :cascade do |t|
    t.uuid "athelete_id", null: false
    t.decimal "distance_in_meters", null: false
    t.decimal "time_in_seconds", null: false
    t.decimal "calories_burned", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["athelete_id"], name: "index_runs_on_athelete_id"
    t.index ["id"], name: "index_runs_on_id", unique: true
  end

end
