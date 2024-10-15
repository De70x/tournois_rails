class AddTagToJoueurs < ActiveRecord::Migration[7.1]
  def change
    add_reference :joueurs, :tag, null: true, foreign_key: true
  end
end
