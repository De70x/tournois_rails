class CreateTournois < ActiveRecord::Migration[7.1]
  def change
    create_table :tournois do |t|
      t.string :nom
      t.integer :annee
      t.boolean :actif

      t.timestamps
    end
  end
end
