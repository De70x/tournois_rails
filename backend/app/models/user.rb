class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :user_roles
  has_many :roles, through: :user_roles
  has_many :permissions, through: :roles

  def has_permission?(permission_name)
    permissions.exists?(name: permission_name)
  end

  def self.jwt_revoked?(payload, user)
    # Check if the token has expired
    payload['exp'] && Time.at(payload['exp']) < Time.now
  end
  
end
