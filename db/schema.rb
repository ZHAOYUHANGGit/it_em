# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160328071622) do

  create_table "cars", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "number",      limit: 255
    t.string   "driver_name", limit: 255
    t.string   "fuel",        limit: 255
    t.string   "area",        limit: 255
    t.decimal  "oil_wear",                precision: 20, scale: 2
    t.datetime "buy_time"
    t.string   "state",       limit: 255
    t.datetime "created_at",                                       null: false
    t.datetime "updated_at",                                       null: false
  end

  create_table "gongdans", force: :cascade do |t|
    t.string   "number",                   limit: 255
    t.string   "title",                    limit: 255
    t.string   "creator",                  limit: 255
    t.string   "department",               limit: 255
    t.string   "area",                     limit: 255
    t.string   "demander",                 limit: 255
    t.string   "emergent",                 limit: 255
    t.string   "description",              limit: 255
    t.string   "appoint_department",       limit: 255
    t.string   "appoint_worker",           limit: 255
    t.string   "state",                    limit: 255
    t.string   "evaluate",                 limit: 255
    t.integer  "user_id",                  limit: 4
    t.datetime "dispatch_time"
    t.datetime "dispatch_time_second"
    t.datetime "transfer_time"
    t.datetime "finish_time"
    t.string   "transger_reson",           limit: 255
    t.string   "appoint_department_again", limit: 255
    t.integer  "flag",                     limit: 4
    t.string   "helpers",                  limit: 255
    t.string   "processing_procedure",     limit: 255
    t.string   "experience_base",          limit: 255
    t.datetime "file_time"
    t.string   "appoint_worker_again",     limit: 255
    t.string   "e_timeliness",             limit: 255
    t.string   "e_attitude",               limit: 255
    t.string   "e_quality",                limit: 255
    t.string   "e_improvement",            limit: 255
    t.datetime "accept_time"
    t.string   "category",                 limit: 255
    t.string   "build_way",                limit: 255
    t.string   "image",                    limit: 255
    t.string   "avatar",                   limit: 255
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.string   "file",                     limit: 255
  end

  create_table "maintains", force: :cascade do |t|
    t.string   "car_name",   limit: 255
    t.string   "car_number", limit: 255
    t.string   "fix_detail", limit: 255
    t.string   "area",       limit: 255
    t.date     "fix_time"
    t.decimal  "cost",                   precision: 20, scale: 2
    t.datetime "created_at",                                      null: false
    t.datetime "updated_at",                                      null: false
  end

  create_table "oil_cards", force: :cascade do |t|
    t.decimal  "l_balance",                 precision: 20, scale: 2
    t.decimal  "recharge",                  precision: 20, scale: 2
    t.decimal  "spend",                     precision: 20, scale: 2
    t.date     "recharge_time"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.string   "area",          limit: 255
  end

  create_table "permissions", force: :cascade do |t|
    t.string   "action",      limit: 255
    t.string   "subject",     limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "permissions_users", id: false, force: :cascade do |t|
    t.integer "permission_id", limit: 4
    t.integer "user_id",       limit: 4
  end

  add_index "permissions_users", ["permission_id", "user_id"], name: "index_permissions_users_on_permission_id_and_user_id", using: :btree
  add_index "permissions_users", ["user_id", "permission_id"], name: "index_permissions_users_on_user_id_and_permission_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",               limit: 255
    t.string   "email",              limit: 255
    t.string   "password_digest",    limit: 255
    t.string   "token",              limit: 255
    t.string   "department",         limit: 255
    t.string   "appoint_department", limit: 255
    t.integer  "number",             limit: 4
    t.string   "area",               limit: 255
    t.integer  "flag",               limit: 4
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "works", force: :cascade do |t|
    t.string   "car_name",      limit: 255
    t.string   "car_number",    limit: 255
    t.string   "driver_name",   limit: 255
    t.string   "department",    limit: 255
    t.string   "start_address", limit: 255
    t.string   "end_address",   limit: 255
    t.decimal  "start_k",                   precision: 20, scale: 2
    t.decimal  "end_k",                     precision: 20, scale: 2
    t.decimal  "tolls",                     precision: 20, scale: 2
    t.decimal  "oils_amount",               precision: 20, scale: 2
    t.decimal  "parking_fees",              precision: 20, scale: 2
    t.date     "work_time"
    t.string   "remarks",       limit: 255
    t.string   "area",          limit: 255
    t.integer  "flag",          limit: 4
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.datetime "s_time"
    t.datetime "e_time"
  end

end
