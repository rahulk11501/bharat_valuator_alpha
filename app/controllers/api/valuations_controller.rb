# app/controllers/api/valuations_controller.rb
class Api::ValuationsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :evaluate ]

  def index
    models = ValuationModel.where(predefined: true).or(ValuationModel.where(user: current_user))
    render json: models
  end

  def create
    model = current_user.valuation_models.new(model_params)
    if model.save
      render json: model, status: :created
    else
      render json: { errors: model.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    model = current_user.valuation_models.find(params[:id])
    model.destroy
    head :no_content
  end

  def evaluate
    symbol = params[:symbol]
    model_id = params[:model_id]

    model = ValuationModel.find(model_id)
    metrics = ValuationDataFetcher.new(symbol).fetch
    valuation = ValuationModelEvaluator.new(metrics).evaluate(model)

    render json: { symbol:, valuation:, model: model.name }
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  private

  def model_params
    params.require(:valuation).permit(:name, :formula)
  end
end
