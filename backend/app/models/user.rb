class User < ApplicationRecord
  enum role: { user: 0, editor: 1, admin: 2 }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  def self.jwt_revoked?(payload, user)
    # Check if the token has expired
    payload['exp'] && Time.at(payload['exp']) < Time.now
  end
  
end
