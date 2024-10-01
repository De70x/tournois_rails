class TagsSerializer
  def self.light(tag)
    {
      id: tag.id,
      nom: tag.nom,
      icon: tag.icon
    }
  end
end
