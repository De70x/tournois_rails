class Joueur < ApplicationRecord
  enum :type_joueur, { classique: 0, fictif: 1, attente: 2 }

  belongs_to :tournoi
  belongs_to :poule
  has_many :matchs_1, class_name: 'MatchsTournoi', foreign_key: :joueur_1_id
  has_many :matchs_2, class_name: 'MatchsTournoi', foreign_key: :joueur_2_id

  validates_uniqueness_of :nom, scope: :tournoi, case_sensitive: false
end
