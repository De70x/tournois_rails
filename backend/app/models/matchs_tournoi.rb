class MatchsTournoi < ApplicationRecord
  enum :statut, { init: -1, en_cours: 0, termine: 1 }

  belongs_to :joueur1, class_name: 'Joueur'
  belongs_to :joueur2, class_name: 'Joueur'
  belongs_to :stade, optional: true
  belongs_to :tableau_final, optional: true

  validate :match_unique_pour_les_poules

  private

  def match_unique_pour_les_poules
    if phase == -1
      existing_match = MatchsTournoi.where(joueur1_id: joueur1_id, joueur2_id: joueur2_id, phase: -1)
                                    .or(MatchsTournoi.where(joueur1_id: joueur2_id, joueur2_id: joueur1_id, phase: -1))
                                    .where.not(id: id)
                                    .exists?
      if existing_match
        errors.add(:base, "Un match existe déjà pour ces joueurs dans la phase -1")
      end
    end
  end

end
