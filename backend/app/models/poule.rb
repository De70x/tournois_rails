class Poule < ApplicationRecord
  belongs_to :tournoi
  has_many :joueurs

  validates_uniqueness_of :nom, scope: :tournoi
end
