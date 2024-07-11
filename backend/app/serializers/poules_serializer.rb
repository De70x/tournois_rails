class PoulesSerializer
  def self.light(poule)
    {
      id: poule.id,
      nom: poule.nom,
      joueurs: poule.joueurs.map { |j| JoueursSerializer.light(j) }
    }
  end

end