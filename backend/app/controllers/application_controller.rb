class ApplicationController < ActionController::API
  respond_to :json
  include ApiException::Handler
end
