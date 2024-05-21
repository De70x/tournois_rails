class MembersController < ApplicationController

  def show
    render json: {
      message: 'If you see this you are logged in',
      user: current_user
    }
  end

  def index
    users = User.all
    render json: users
  end
end