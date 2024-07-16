# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_06_19_034505) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "joueurs", force: :cascade do |t|
    t.string "nom"
    t.integer "type_joueur", default: 0, null: false
    t.bigint "poule_id"
    t.bigint "tournoi_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["poule_id"], name: "index_joueurs_on_poule_id"
    t.index ["tournoi_id"], name: "index_joueurs_on_tournoi_id"
  end

  create_table "jwt_denylist", force: :cascade do |t|
    t.string "jti", null: false
    t.datetime "exp", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["jti"], name: "index_jwt_denylist_on_jti"
  end

  create_table "matchs_tournois", force: :cascade do |t|
    t.bigint "joueur1_id", null: false
    t.bigint "joueur2_id", null: false
    t.integer "score_1", default: 0, null: false
    t.integer "score_2", default: 0, null: false
    t.integer "statut", default: 0, null: false
    t.bigint "stade_id", null: false
    t.integer "phase", default: -1, null: false
    t.integer "indice"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["joueur1_id"], name: "index_matchs_tournois_on_joueur1_id"
    t.index ["joueur2_id"], name: "index_matchs_tournois_on_joueur2_id"
    t.index ["stade_id"], name: "index_matchs_tournois_on_stade_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "poules", force: :cascade do |t|
    t.string "nom"
    t.bigint "tournoi_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournoi_id"], name: "index_poules_on_tournoi_id"
  end

  create_table "role_permissions", force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "permission_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["permission_id"], name: "index_role_permissions_on_permission_id"
    t.index ["role_id"], name: "index_role_permissions_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "stades", force: :cascade do |t|
    t.string "nom"
    t.bigint "tournoi_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournoi_id"], name: "index_stades_on_tournoi_id"
  end

  create_table "tournois", force: :cascade do |t|
    t.string "nom"
    t.integer "annee"
    t.boolean "actif"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "role_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["role_id"], name: "index_user_roles_on_role_id"
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "joueurs", "poules"
  add_foreign_key "joueurs", "tournois"
  add_foreign_key "matchs_tournois", "joueurs", column: "joueur1_id"
  add_foreign_key "matchs_tournois", "joueurs", column: "joueur2_id"
  add_foreign_key "matchs_tournois", "stades"
  add_foreign_key "poules", "tournois"
  add_foreign_key "role_permissions", "permissions"
  add_foreign_key "role_permissions", "roles"
  add_foreign_key "stades", "tournois"
  add_foreign_key "user_roles", "roles"
  add_foreign_key "user_roles", "users"
end
