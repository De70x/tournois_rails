class CreateJoueurs < ActiveRecord::Migration[7.1]
  def change
    create_table :joueurs do |t|
      t.string :nom
      t.integer :type_joueur, default: 0, null: false
      t.references :poule, null: true, foreign_key: true
      t.references :tournoi, null: true, foreign_key: true

      t.timestamps
    end
  end
end
