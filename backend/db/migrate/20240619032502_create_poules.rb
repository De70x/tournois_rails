class CreatePoules < ActiveRecord::Migration[7.1]
  def change
    create_table :poules do |t|
      t.string :nom
      t.references :tournoi, null: false, foreign_key: true

      t.timestamps
    end
  end
end
