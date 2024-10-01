class TournoisController < ApplicationController
  before_action :set_tournoi, only: %i[ show update destroy ]

  # GET /tournois
  def index
    @tournois = Tournoi.all

    render json: @tournois.map { |t| TournoisSerializer.light(t) }
  end

  # GET /tournois/1
  def show
    render json: TournoisSerializer.full(@tournoi)
  end

  # POST /tournois
  def create
    @tournoi = Tournoi.new(tournoi_params)

    if @tournoi.save
      render json: @tournoi, status: :created, location: @tournoi
    else
      render json: @tournoi.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tournois/1
  def update
    if @tournoi.update(tournoi_params)
      render json: @tournoi
    else
      render json: @tournoi.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tournois/1
  def destroy
    @tournoi.destroy!
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_tournoi
    @tournoi = Tournoi.find(params[:id])
    p @tournoi.joueurs
  end

  # Only allow a list of trusted parameters through.
  def tournoi_params
    params.require(:tournoi).permit(:nom, :annee, :actif)
  end
end
