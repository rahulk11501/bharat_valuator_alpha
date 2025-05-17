# app/controllers/react_controller.rb
class ReactController < ApplicationController
  def index
    render template: "react/index", layout: "application"
  end
end
