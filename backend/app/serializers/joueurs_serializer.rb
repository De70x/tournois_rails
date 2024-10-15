class JoueursSerializer
  def self.light(joueur)
    {
      id: joueur.id,
      nom: joueur.nom,
      poule_id: joueur.poule_id,
      points: joueur.calculate_points,
      nb_matchs: joueur.nb_matchs,
      type_joueur: joueur.type_joueur,
    }
  end

  def self.full(joueur)
    {
      id: joueur.id,
      nom: joueur.nom,
      matchs: joueur.matchs1 + joueur.matchs2,
      poule_id: joueur.poule_id,
      points: joueur.calculate_points,
      nb_matchs: joueur.nb_matchs,
      tableau_final_id: joueur.tableau_final&.id,
      tag_id: joueur.tag_id,
      type_joueur: joueur.type_joueur,
    }
  end
end
