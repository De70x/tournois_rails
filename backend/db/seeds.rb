# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).

user = User.create(email:'tc-pm@outlook.fr', password: 'nhzWJJ58')

admin = Role.create(name: 'admin')
Role.create(name: 'editor')
Role.create(name: 'viewer')

edit = Permission.create(name: 'edit')

RolePermission.create(role:admin, permission: edit)
UserRole.create(user: user, role: admin)
