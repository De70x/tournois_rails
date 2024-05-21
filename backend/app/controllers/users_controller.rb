class UsersController < ApplicationController
  before_action :authenticate_user!

  def permissions
    render json: current_user.permissions.pluck(:name)
  end
end