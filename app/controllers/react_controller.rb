# app/controllers/react_controller.rb
class ReactController < ApplicationController
  before_action :authenticate_user!
  def index
    render template: "react/index", layout: "application"
  end
end
