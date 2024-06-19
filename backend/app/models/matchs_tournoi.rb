class MatchsTournoi < ApplicationRecord
  enum :statut, { en_cours: 0, termine: 1 }

  belongs_to :joueur_1, :class_name => 'Joueur'
  belongs_to :joueur_2, :class_name => 'Joueur'
  belongs_to :stade

  validates_uniqueness_of :joueur_1, scope: [:joueur_2, :phase]
end
