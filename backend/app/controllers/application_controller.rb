class ApplicationController < ActionController::API
  before_action :authenticate_user!
  respond_to :json
  include ApiException::Handler
end
