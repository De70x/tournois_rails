class TournoisSerializer
  def self.light(tournoi)
    {
      id: tournoi.id,
      nom: tournoi.nom,
      annee: tournoi.annee
    }
  end

  def self.full(tournoi)
    {
      id: tournoi.id,
      nom: tournoi.nom,
      annee: tournoi.annee,
      joueurs: tournoi.joueurs.map { |j| JoueursSerializer.full(j) },
      poules: tournoi.poules.map { |p| PoulesSerializer.light(p) },
      stades: tournoi.stades,
      matchs: tournoi.matchs_tournois,
      tableaux: tournoi.tableau_finals,
      tags: tournoi.tags,
    }
  end
end
