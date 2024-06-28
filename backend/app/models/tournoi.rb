class Tournoi < ApplicationRecord
  has_many :poules
  has_many :stades
  has_many :joueurs

  validates_uniqueness_of :nom, scope: :annee
end
