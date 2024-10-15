class TableauFinal < ApplicationRecord
  belongs_to :tournoi

  validates_uniqueness_of :nom, scope: :tournoi
end
