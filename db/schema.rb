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

ActiveRecord::Schema.define(version: 2019_07_16_214526) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "locations", force: :cascade do |t|
    t.string "name", null: false
    t.string "address", null: false
    t.jsonb "hours", default: "{}", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reviews", force: :cascade do |t|
    t.string "title", null: false
    t.integer "score", null: false
    t.boolean "music"
    t.string "review", default: ""
    t.integer "seating"
    t.integer "bathroom_count"
    t.integer "noise_level"
    t.integer "wifi_speed"
    t.bigint "location_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id"
    t.index ["bathroom_count"], name: "index_reviews_on_bathroom_count"
    t.index ["location_id"], name: "index_reviews_on_location_id"
    t.index ["noise_level"], name: "index_reviews_on_noise_level"
    t.index ["seating"], name: "index_reviews_on_seating"
    t.index ["user_id"], name: "index_reviews_on_user_id"
    t.index ["wifi_speed"], name: "index_reviews_on_wifi_speed"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.date "birthday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "reviews", "users"
end
