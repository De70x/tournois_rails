class CreateMatchsTournois < ActiveRecord::Migration[7.1]
  def change
    create_table :matchs_tournois do |t|
      t.references :joueur1, null: false, foreign_key: { to_table: 'joueurs' }
      t.references :joueur2, null: false, foreign_key: { to_table: 'joueurs' }
      t.integer :score_1, default: 0, null: false
      t.integer :score_2, default: 0, null: false
      t.integer :statut, default: 0, null: false
      t.references :stade, null: true, foreign_key: true
      t.references :tableau_final, null: true, foreign_key: true
      t.integer :phase, default: -1, null: false
      t.integer :indice

      t.timestamps
    end
  end
end
