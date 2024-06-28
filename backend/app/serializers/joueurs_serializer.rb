class JoueursSerializer
  def self.light(joueur)
    {
      id: joueur.id,
      nom: joueur.nom,
      poule_id: joueur.poule_id,
    }
  end

  def self.full(joueur)
    {
      id: joueur.id,
      nom: joueur.nom,
      matchs: joueur.matchs_1 + joueur.matchs_2,
    }
  end

end