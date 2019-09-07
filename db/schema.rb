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

ActiveRecord::Schema.define(version: 2019_09_07_152917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "business_hours", force: :cascade do |t|
    t.integer "open_time"
    t.integer "close_time"
    t.index ["close_time"], name: "index_business_hours_on_close_time"
    t.index ["open_time"], name: "index_business_hours_on_open_time"
  end

  create_table "chains", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_chains_on_name"
  end

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.jsonb "address", default: {"city"=>nil, "state"=>nil, "country"=>nil, "zipcode"=>nil, "address_part_1"=>nil, "address_part_2"=>nil, "address_part_3"=>nil}, null: false
    t.jsonb "business_hours", default: {"friday"=>nil, "monday"=>nil, "sunday"=>nil, "tuesday"=>nil, "saturday"=>nil, "thursday"=>nil, "wednesday"=>nil}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "chain_id"
    t.decimal "lat", default: "0.0", null: false
    t.decimal "lng", default: "0.0", null: false
    t.boolean "is_open", default: true, null: false
    t.index ["chain_id"], name: "index_locations_on_chain_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title", null: false
    t.integer "score", null: false
    t.boolean "music"
    t.string "review", default: ""
    t.integer "seating_count"
    t.integer "bathroom_count"
    t.integer "noise_level"
    t.integer "wifi_speed"
    t.string "start_time"
    t.string "end_time"
    t.bigint "location_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["bathroom_count"], name: "index_reviews_on_bathroom_count"
    t.index ["location_id"], name: "index_reviews_on_location_id"
    t.index ["noise_level"], name: "index_reviews_on_noise_level"
    t.index ["seating_count"], name: "index_reviews_on_seating_count"
    t.index ["user_id"], name: "index_reviews_on_user_id"
    t.index ["wifi_speed"], name: "index_reviews_on_wifi_speed"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.date "birthday"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "locations", "chains"
  add_foreign_key "reviews", "users"
end
