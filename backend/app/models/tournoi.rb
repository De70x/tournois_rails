class Tournoi < ApplicationRecord
  has_many :poules, dependent: :destroy
  has_many :stades, dependent: :destroy
  has_many :joueurs, dependent: :destroy
  has_many :tableau_finals, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :matchs_tournois1, -> { distinct }, through: :joueurs, source: :matchs1, dependent: :destroy
  has_many :matchs_tournois2, -> { distinct }, through: :joueurs, source: :matchs2, dependent: :destroy

  validates_uniqueness_of :nom, scope: :annee

  after_create :create_tableaux_finaux

  def matchs_tournois
    MatchsTournoi.where(id: matchs_tournois1.pluck(:id) + matchs_tournois2.pluck(:id)).distinct
  end

  def create_tableaux_finaux
    TableauFinal.create(tournoi_id: id, nom: 'Principale')
    TableauFinal.create(tournoi_id: id, nom: 'Consolante')
  end

end
