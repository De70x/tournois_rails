# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

Role.create(name: 'admin')
Role.create(name: 'editor')
Role.create(name: 'viewer')

Joueur.create(nom: 'BYE', type_joueur: 1)
Joueur.create(nom: '???', type_joueur: 2)
