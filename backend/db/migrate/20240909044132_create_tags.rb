class CreateTags < ActiveRecord::Migration[7.1]
  def change
    create_table :tags do |t|
      t.string :nom
      t.string :icon

      t.timestamps
    end
  end
end
