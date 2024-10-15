class AddTableauFinalToJoueur < ActiveRecord::Migration[7.1]
  def change
    add_reference :joueurs, :tableau_final, null: true, foreign_key: true
  end
end
