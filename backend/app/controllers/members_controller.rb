class MembersController < ApplicationController
  before_action -> { authorize_role(:admin) }, only: [:show]

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