class AddTournoiToTags < ActiveRecord::Migration[7.1]
  def change
    add_reference :tags, :tournoi, null: false, foreign_key: true
  end
end
