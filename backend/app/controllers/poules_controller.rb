class PoulesController < ApplicationController
  before_action :set_poule, only: %i[ show update destroy ]

  # GET /poules
  def index
    @poules = Poule.all

    render json: @poules
  end

  # GET /poules/1
  def show
    render json: @poule
  end

  # POST /poules
  def create
    @poule = Poule.new(poule_params)

    if @poule.save
      render json: PoulesSerializer.light(@poule), status: :created, location: @poule
    else
      render json: @poule.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /poules/1
  def update
    if @poule.update(poule_params)
      render json: @poule
    else
      render json: @poule.errors, status: :unprocessable_entity
    end
  end

  # DELETE /poules/1
  def destroy
    @poule.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_poule
    @poule = Poule.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def poule_params
    params.require(:poule).permit(:nom, :tournoi_id)
  end
end
