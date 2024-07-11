class Joueur < ApplicationRecord
  enum :type_joueur, { classique: 0, fictif: 1, attente: 2 }

  belongs_to :tournoi, optional: true
  belongs_to :poule, optional: true
  has_many :matchs_1, class_name: 'MatchsTournoi', foreign_key: :joueur_1_id
  has_many :matchs_2, class_name: 'MatchsTournoi', foreign_key: :joueur_2_id

  validates_uniqueness_of :nom, scope: :tournoi, case_sensitive: false

  def calculate_points
    MatchsTournoi.where(phase: -1)
                 .where('joueur_1_id = ? OR joueur_2_id = ?', id, id)
                 .sum do |match|
      if match.joueur_1_id == id
        match.score_1
      else
        match.score_2
      end
    end
  end

  def nb_matchs
    MatchsTournoi.where(phase: -1)
                 .where('joueur_1_id = ? OR joueur_2_id = ?', id, id)
                 .sum do
      1
    end
  end

end
