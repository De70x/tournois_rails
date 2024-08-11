class CreateTableauFinals < ActiveRecord::Migration[7.1]
  def change
    create_table :tableau_finals do |t|
      t.string :nom
      t.references :tournoi, null: false, foreign_key: true

      t.timestamps
    end
  end
end
