class Joueur < ApplicationRecord
  enum :type_joueur, { classique: 0, fictif: 1, attente: 2 }

  belongs_to :tournoi, optional: true
  belongs_to :poule, optional: true
  has_many :matchs1, class_name: 'MatchsTournoi', foreign_key: :joueur1_id
  has_many :matchs2, class_name: 'MatchsTournoi', foreign_key: :joueur2_id

  validates_uniqueness_of :nom, scope: :tournoi, case_sensitive: false

  def calculate_points
    acc = 0
    matchs1.each do |match|
      acc += match.score_1
    end
    matchs2.each do |match|
      acc += match.score_2
    end
    acc
  end

  def nb_matchs
    matchs1.length + matchs2.length
  end

end
