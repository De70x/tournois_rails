class StadesController < ApplicationController
  before_action :set_stade, only: %i[ show update destroy ]

  # GET /stades
  def index
    @stades = Stade.all

    render json: @stades
  end

  # GET /stades/1
  def show
    render json: @stade
  end

  # POST /stades
  def create
    @stade = Stade.new(stade_params)

    if @stade.save!
      render json: @stade, status: :created, location: @stade
    else
      render json: @stade.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /stades/1
  def update
    if @stade.update!(stade_params)
      render json: @stade
    else
      render json: @stade.errors, status: :unprocessable_entity
    end
  end

  # DELETE /stades/1
  def destroy
    @stade.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_stade
    @stade = Stade.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def stade_params
    params.require(:stade).permit(:nom, :tournoi_id)
  end
end
