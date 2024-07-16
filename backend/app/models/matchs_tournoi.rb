class MatchsTournoi < ApplicationRecord
  enum :statut, { init: -1, en_cours: 0, termine: 1 }

  belongs_to :joueur1, class_name: 'Joueur'
  belongs_to :joueur2, class_name: 'Joueur'
  belongs_to :stade

  validates_uniqueness_of :joueur1_id, scope: %i[joueur2_id phase]
end
