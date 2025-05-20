# app/controllers/api/watchlists_controller.rb
class Api::WatchlistsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.watchlists.select(:stock_symbol)
  end

  def create
    watch = current_user.watchlists.find_or_create_by(stock_symbol: params[:stock_symbol])
    render json: watch
  end

  def destroy
    watch = current_user.watchlists.find_by(stock_symbol: params[:stock_symbol])
    watch&.destroy
    head :no_content
  end
end
