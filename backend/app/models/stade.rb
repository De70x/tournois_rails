class Stade < ApplicationRecord
  belongs_to :tournoi
  has_many :matchs_tournois

  validates_uniqueness_of :nom, scope: :tournoi
end
