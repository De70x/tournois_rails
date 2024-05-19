class ApplicationController < ActionController::API
  before_action :authenticate_user!
  respond_to :json
  include ApiException::Handler

  def authorize_role(*roles)
    p 'checking roles'
    p current_user.inspect
    unless roles.any? { |role| current_user.send("#{role}?") }
      render json: { error: "You are not authorized to perform this action" }, status: :unauthorized
    end
  end
end
