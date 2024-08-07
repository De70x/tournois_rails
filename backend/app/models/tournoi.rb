class Tournoi < ApplicationRecord
  has_many :poules
  has_many :stades
  has_many :joueurs
  has_many :matchs_tournois1, -> { distinct }, through: :joueurs, source: :matchs1
  has_many :matchs_tournois2, -> { distinct }, through: :joueurs, source: :matchs2

  validates_uniqueness_of :nom, scope: :annee

  def matchs_tournois
    MatchsTournoi.where(id: matchs_tournois1.pluck(:id) + matchs_tournois2.pluck(:id)).distinct
  end

end
