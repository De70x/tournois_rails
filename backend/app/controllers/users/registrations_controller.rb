class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  private
  def respond_with(resource, _opts = {})
    registration_success && return if resource.persisted?

    registration_failure
  end

  def registration_success
    render json: {
      message: 'Signed up successfully.',
      user: current_user
    }, status: :ok
  end

  def registration_failure
    render json: {
      message: 'Something went wrong.'
    }
  end
end