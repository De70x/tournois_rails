class JoueursSerializer
  def self.light(joueur)
    {
      id: joueur.id,
      nom: joueur.nom,
      poule_id: joueur.poule_id,
      points: joueur.calculate_points,
      nb_matchs: joueur.nb_matchs
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
      matchs1: joueur.matchs1,
      matchs2: joueur.matchs2
    }
  end
end
