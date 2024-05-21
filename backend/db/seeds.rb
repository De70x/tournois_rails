# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

admin_role = Role.create(name: 'admin')
editor_role = Role.create(name: 'editor')
viewer_role = Role.create(name: 'viewer')

create_article_permission = Permission.create(name: 'create_article')
edit_article_permission = Permission.create(name: 'edit_article')
view_article_permission = Permission.create(name: 'view_article')

admin_role.permissions << [create_article_permission, edit_article_permission, view_article_permission]
editor_role.permissions << [edit_article_permission, view_article_permission]
viewer_role.permissions << [view_article_permission]