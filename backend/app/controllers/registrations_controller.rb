class RegistrationsController < Devise::RegistrationsController

  private

  def respond_with(resource, _opts = {})
    render json: { user: resource }, status: :ok
  end
end