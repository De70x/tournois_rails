class SessionsController < Devise::SessionsController
  def create
    if user_signed_in?
      render json: { user: current_user, token: current_token }
    else
      super { @token = current_token }
    end
  end

  def show
  end

  private

  def current_token
    request.env['warden-jwt_auth.token']
  end
end